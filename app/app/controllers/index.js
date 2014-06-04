/**
 * Module dependencies.
 */
var mongoose = require( 'mongoose' ),
    Portal = mongoose.model( 'Portal' );

/*
 * GET home page.
 */

exports.index = function( req, res )
{
    // robot index
    if( req.query && req.query._escaped_fragment_ != undefined )
    {
        res.render( 'snapshot_index' );
    }
    else
    {
        res.render( 'index' );
    }
};
