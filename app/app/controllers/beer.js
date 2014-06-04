/**
 * Module dependencies.
 */
var mongoose = require( 'mongoose' ),
    Beer = mongoose.model( 'Beer' ),
    _ = require( 'underscore' );


/**
 * Find beer by id
 */
exports.beer = function( req, res, next, id )
{
    Beer.findById( id, function( err, beer )
    {
        if( err )
        {
            return next( err );
        }
        if( !beer )
        {
            return next( new Error( 'Failed to load beer ' + id ) );
        }
        req.beer = beer;
        next();
    } );
};

/**
 * Create a beer
 */
exports.create = function( req, res )
{
    var beer = new Beer( req.body );

    beer.save( function( err, beer )
    {
        if( err )
        {
            console.log( err );
            res.jsonp( { errors: err, beer: beer } );
        }
        else
        {
            res.jsonp( beer );
        }
    } );
};

/**
 * Update a beer
 */
exports.update = function( req, res )
{
    var beer = req.beer;

    beer = _.extend( beer, req.body );

    beer.save( function( err, beer )
    {
        if( err )
        {
            console.log( err );
            res.jsonp( { errors: err, vendor: beer } );
        }
        else
        {
            res.jsonp( beer );
        }
    } );
};

/**
 * Delete a beer
 */
exports.destroy = function( req, res )
{
    var beer = req.beer;

    beer.remove( function( err )
    {
        if( err )
        {
            res.render( {
                errors: err.errors,
                vendor: beer
            } );
        }
        else
        {
            res.jsonp( beer );
        }
    } );
};

/**
 * Show a beer
 */
exports.show = function( req, res )
{
    res.jsonp( req.beer );
};

/**
 * List of beers
 */
exports.all = function( req, res )
{
    Beer.find( function( err, beers )
    {
        if( err )
        {
            return next( err );
        }

        if( !beers )
        {
            return next( new Error( 'Failed to load beers' ) );
        }

        res.jsonp( beers );
    } );
};
