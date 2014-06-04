/**
 * Module dependencies.
 */
var mongoose = require( 'mongoose' ),
    config = require( '../../config/config' ),
    Schema = mongoose.Schema;

/**
 * Portal Schema
 */
var PortalSchema = new Schema( {
    mode: {
        type: String,
        required: true,
        default: 'registration'
    },
    signUpEnable: {
        type: Boolean,
        default: true
    }
} );

mongoose.model( 'Portal', PortalSchema );
