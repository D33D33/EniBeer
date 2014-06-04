/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function( req, res, next )
{
    if( !req.isAuthenticated() )
    {
        return res.send( 401, 'User is not authorized' );
    }
    if( !req.user.isEnable )
    {
        console.log( "User not enable" );
        return res.redirect( '/' );
    }
    next();
};

/**
 * Require a user to be logged and admin
 */
exports.requiresAdmin = function( req, res, next )
{
    if( !req.isAuthenticated() )
    {
        return res.send( 401, 'User is not authorized' );
    }
    if( !req.user.isEnable )
    {
        console.log( "User not enable" );
        return res.redirect( '/' );
    }
    if( !req.user.isAdmin )
    {
        console.log( "User not admin" );
        return res.redirect( '/' );
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function( req, res, next )
    {
        if( req.profile.id != req.user.id )
        {
            return res.send( 401, 'User is not authorized' );
        }
        next();
    }
};
