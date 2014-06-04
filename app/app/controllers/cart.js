/**
 * Module dependencies.
 */
var mongoose = require( 'mongoose' ),
    Cart = mongoose.model( 'Cart' ),
    _ = require( 'underscore' );


/**
 * Find cart by id
 */
exports.cart = function( req, res, next, id )
{
    Cart.findById( id ).populate('user').exec( function( err, cart )
    {
        if( err )
        {
            return next( err );
        }
        if( !cart )
        {
            return next( new Error( 'Failed to load cart ' + id ) );
        }
        req.cart = cart;
        next();
    } );
};

/**
 * Create a cart
 */
exports.create = function( req, res )
{
    var cart = new Cart( req.body );
    cart.user = req.user._id;

    cart.save( function( err, beer )
    {
        if( err )
        {
            console.log( err );
            res.jsonp( { errors: err, cart: cart } );
        }
        else
        {
            res.jsonp( cart );
        }
    } );
};

/**
 * Update a cart
 */
exports.update = function( req, res )
{
    var cart = req.cart;

    cart = _.extend( cart, req.body );

    cart.save( function( err, cart )
    {
        if( err )
        {
            console.log( err );
            res.jsonp( { errors: err, vendor: cart } );
        }
        else
        {
            res.jsonp( cart );
        }
    } );
};

/**
 * Delete a cart
 */
exports.destroy = function( req, res )
{
    var cart = req.cart;

    cart.remove( function( err )
    {
        if( err )
        {
            res.render( {
                errors: err.errors,
                vendor: cart
            } );
        }
        else
        {
            res.jsonp( cart );
        }
    } );
};

/**
 * Show a cart
 */
exports.show = function( req, res )
{
    res.jsonp( req.cart );
};

/**
 * List of carts
 */
exports.all = function( req, res )
{
    Cart.find().populate('user').exec( function( err, carts )
    {
        if( err )
        {
            return next( err );
        }

        if( !carts )
        {
            return next( new Error( 'Failed to load carts' ) );
        }

        res.jsonp( carts );
    } );
};
