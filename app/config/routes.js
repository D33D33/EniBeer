var _ = require('underscore');

module.exports = function( app, passport, auth )
{
    //User Routes
    var users = require( '../app/controllers/users' );

    app.post( '/login', function( req, res, next )
    {
        passport.authenticate( 'local', function( err, user, info )
        {
            if( err )
            {
                return next( err );
            }
            if( !user )
            {
                return res.jsonp( {success: false} );
            }
            req.logIn( user, function( err )
            {
                if( err )
                {
                    return next( err );
                }
                return res.jsonp( {success: true, user: _.omit(user._doc, ['__v', 'hashed_password', 'provider', 'salt'])} );
            } );
        } )( req, res, next );
    } );

    app.post( '/signout', users.signout );

    //Setting up the users api
    app.post( '/users', users.create );

    app.get( '/users', auth.requiresAdmin, users.all );
    app.get( '/users/me', users.me );
    app.post( '/users/:userId', auth.requiresLogin, users.update );

    /*//Setting the facebook oauth routes
     app.get('/auth/facebook', passport.authenticate('facebook', {
     scope: ['email', 'user_about_me'],
     failureRedirect: '/signin'
     }), users.signin);

     app.get('/auth/facebook/callback', passport.authenticate('facebook', {
     failureRedirect: '/signin'
     }), users.authCallback);

     //Setting the github oauth routes
     app.get('/auth/github', passport.authenticate('github', {
     failureRedirect: '/signin'
     }), users.signin);

     app.get('/auth/github/callback', passport.authenticate('github', {
     failureRedirect: '/signin'
     }), users.authCallback);

     //Setting the twitter oauth routes
     app.get('/auth/twitter', passport.authenticate('twitter', {
     failureRedirect: '/signin'
     }), users.signin);

     app.get('/auth/twitter/callback', passport.authenticate('twitter', {
     failureRedirect: '/signin'
     }), users.authCallback);

     //Setting the google oauth routes
     app.get('/auth/google', passport.authenticate('google', {
     failureRedirect: '/signin',
     scope: [
     'https://www.googleapis.com/auth/userinfo.profile',
     'https://www.googleapis.com/auth/userinfo.email'
     ]
     }), users.signin);

     app.get('/auth/google/callback', passport.authenticate('google', {
     failureRedirect: '/signin'
     }), users.authCallback);*/

    //Finish with setting up the userId param
    app.param( 'userId', users.user );

    //Home route
    var index = require( '../app/controllers/index' );
    app.get( '/', index.index );

    //Vendor route
    var beer = require( '../app/controllers/beer' );
    app.get( '/beers', beer.all );
    app.get( '/beers/:beerId', auth.requiresLogin, beer.show );

    app.post( '/beers', auth.requiresAdmin, beer.create );
    app.post( '/beers/:beerId', auth.requiresAdmin, beer.update );

    app.delete( '/beers/:beerId', auth.requiresAdmin, beer.destroy );

    //Finish with setting up the userId param
    app.param( 'beerId', beer.beer );

    //Cart route
    var cart = require( '../app/controllers/cart' );
    app.get( '/carts', auth.requiresAdmin, cart.all );
    app.get( '/cart/:cartId', auth.requiresLogin, cart.show );

    app.post( '/cart', auth.requiresLogin, cart.create );
    app.post( '/cart/:cartId', auth.requiresLogin, cart.update );

    //Finish with setting up the userId param
    app.param( 'cartId', cart.cart );

};
