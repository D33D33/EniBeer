/**
 * Module dependencies.
 */
var mongoose = require( 'mongoose' ),
    config = require( '../../config/config' ),
    Beer = require( '../models/cart' ),
    User = require( '../models/user' ),
    Schema = mongoose.Schema;

/**
 * Cart Schema
 */
var CartSchema = mongoose.Schema( {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    beers: [Beer.BeerSchema],
    amount: {
        type: Number,
        required: true
    }
} );
mongoose.model( 'Cart',CartSchema );
