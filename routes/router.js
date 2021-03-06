module.exports = function ( router, cust ) {
	// router middleware
	// this middleware will called for every requested
	// were made
	router.use( function( req, res, next ) {
	    // log each request to the console
	    if ( req.query._method == 'DELETE' ) {
	    	req.method = 'DELETE';
	    	req.url = req.path;
	    }
	    //req.method = 'DELETE';
	    console.log(req);
	    console.log(req.params)
	    console.log('asd:' + req.path);
	    console.log('METHOD : ' + req.method, 'URL : ' + req.url);
	    // continue doing what we were doing and go to the route
	    next(); 
	});

	router
		.get( '/customers', cust.list )
		.get( '/customers/add', cust.add )
		.post( '/customers/add', cust.addData )
		.delete( '/customers/:id', cust.deleteData )

}