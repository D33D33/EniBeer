/**
 * Module dependencies.
 */
var mongoose = require( 'mongoose' ),
    config = require( '../../config/config' ),
    Schema = mongoose.Schema;

/**
 * Beer Schema
 */
var BeerSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    alcoholic: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
} );
exports.BeerSchema = BeerSchema;
mongoose.model( 'Beer',BeerSchema );
