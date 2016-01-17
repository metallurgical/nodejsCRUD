var express 			= require( 'express' ), // web framework
    app     			= express(),
    mysql   			= require( 'mysql' ), // mysql database
    myconnection        = require( 'express-myconnection' ), // express with mysql database fullset of function
    bodyParser 			= require( 'body-parser'), // urlencoded,json, methodoveridde
    morgan				= require( 'morgan' ), //debugger into console
    methodOverride      = require( 'method-override' ),
    customer,
    dbOption,
    router = express.Router(); // we're using mini express routing instead of default route
// include customer.js function
customer = require( './routes/customer' );
// set views folder that hold template
app.set( 'views', __dirname + '/views' );
// view engines used for view
app.set( 'view engine', 'ejs' );
// console logging
app.use( morgan('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ));
/*app.use( methodOverride( '_method' ) );*/
/*app.use(methodOverride(function(req, res){
  if (req.params ) {
    // look in urlencoded POST bodies and delete it
    console.log(req.path)
    var method = req.params._method;
    req.path.replace(/[.]+?\?[a-z]+/ig, '');
    //delete req.body._method
    return method;
  }
}))*/
app.use(methodOverride('X-HTTP-Method-Override', "DELETE"))

// serve static file like css, js, plugins
app.use( '/static', express.static( __dirname + '/public') );
// db connection setting
dbOption = {

	host : 'localhost',
	user : 'root',
	password : '',
	port : 3306,
	database : 'nodejstest'
}
// db connection 
app.use( myconnection( mysql, dbOption, 'single' ) );
// routing with router(mini app express, customer set of function)
require( './routes/router' )( router, customer );
// finally apply the route to our application
app.use('/', router);
// server created with port to listens
app.listen(3000, function(){
  console.log('Express server listening on port 3000' );
});


