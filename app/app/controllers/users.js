/**
 * Module dependencies.
 */
var mongoose = require( 'mongoose' ),
    User = mongoose.model( 'User' ),
    Portal = mongoose.model( 'Portal' ),
    crypto = require( 'crypto' ),
    _ = require( 'underscore' );

/**
 * Logout
 */
exports.signout = function( req, res )
{
    req.logout();
    return res.jsonp( { 'success': true } );
};

/**
 * Create user
 */
exports.create = function( req, res )
{
    var user = new User( req.body );

    User.findOne( { }, function( err, oneUser )
    {
        var firstUser = false;
        if( err )
        {
            console.log( err );
        }
        else
        {
            if( oneUser == null )
            {
                firstUser = true;
            }
        }

        user.isAdmin = firstUser; // set the first register user as admin, all other as regular user
        user.provider = 'local';
        user.save( function( err )
        {
            if( err )
            {
                if( err.err.indexOf( 'email' ) >= 0 )
                {
                    return res.jsonp( { 'success': false, 'errorIn': 'email' } );
                }
                else if( err.err.indexOf( 'phone' ) >= 0 )
                {
                    return res.jsonp( { 'success': false, 'errorIn': 'phone' } );
                }
                else
                {
                    console.error( err );
                    return res.jsonp( { 'success': false, 'errorIn': 'unknown' } );
                }
            }
            req.logIn( user, function( err )
            {
                if( err )
                {
                    return res.jsonp( { 'success': false, 'error': err } );
                }
                return res.jsonp( { 'success': true, 'user': _.omit( user._doc, ['__v', 'hashed_password', 'provider', 'salt'] ) } );
            } );
        } );
    } );
};

/**
 * Send User
 */
exports.me = function( req, res )
{
    res.jsonp( req.user || {} );
};

/**
 * Find user by id
 */
exports.user = function( req, res, next, id )
{
    User
        .findOne( {
            _id: id
        } )
        .exec( function( err, user )
        {
            if( err )
            {
                return next( err );
            }
            if( !user )
            {
                return next( new Error( 'Failed to load User ' + id ) );
            }
            req.profile = user;
            next();
        } );
};

/**
 * Get all users
 */
exports.all = function( req, res )
{
    User.find( function( err, users )
    {
        if( err )
        {
            return next( err );
        }

        if( !users )
        {
            return next( new Error( 'Failed to load Users' ) );
        }

        res.jsonp( users );
    } );
};

/**
 * Update user
 */
exports.update = function( req, res, next )
{
    if( req.user._id != req.body._id && !req.user.isAdmin )
    {
        console.warn( "Operation cancel. User attempt to modify other user");
        res.jsonp( { errors: true } );
    }

    User.findOne( {
        _id: req.body._id
    } )
        .exec( function( err, user )
        {
            if( err )
            {
                return next( err );
            }
            if( !user )
            {
                return next( new Error( 'Failed to load User ' + req.body._id ) );
            }

            var admin = user.isAdmin,
                enable = user.isEnable;

            user = _.extend( user, req.body );

            if( ! req.user.isAdmin ) // prevent auto upright
            {
                user.isAdmin = admin;
                user.isEnable = enable;
            }

            req.profile = user;
            user.save( function( err, user )
            {
                if( err )
                {
                    console.log( err );
                    res.jsonp( { errors: err, user: user } );
                }
                else
                {
                    res.jsonp( user );
                }
            } );
        } );
};
