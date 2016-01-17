exports.list = function ( req, res,next ) {

	req.getConnection(function ( err, conn ) {

		if ( err ) return next( err );

		conn.query( 'SELECT *FROM customers', function ( err, data ) {
			if ( err ) return next( err );
			//console.log(JSON.stringify(data, null, 2));
			res.render( 'customerList.ejs', { title : 'Customer List', data : data } );
		});
	});
}

exports.add = function ( req, res, next ) {

	res.render( 'customerAdd.ejs', { title : 'Customer Form' } );
}

exports.addData = function ( req, res, next ) {

	var formData = JSON.parse( JSON.stringify( req.body ) );
	var data = {            
            customer_name    : formData.customer_name         
        };

	req.getConnection( function ( err, conn ) {

		if ( err ) return next( err );

		conn.query( 'INSERT INTO customers set ?', data, function () {
			res.redirect('/customers');
		});

	});
}

exports.deleteData = function ( req, res, next ) {
	console.log( req.params.id )
}