// server.js - major thnaks to http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

/*
API overview:

/items
		- POST: create new book record
		- GET: retrieve all items

*/

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});


//API METHODS FOR GENERAL ITEMS
	router.route('/widgets')
//=============================

/***
	GET ALL ITEMS
	- GET api/v1/items
**/	
	.get(function(req, res) {	
			res.send('here is a list of available widgets');
		});
	});
	

//SINGLE ITEMS
//=============================
	router.route('/items/:id')

/***
	GET ITEMS BY ID
	- GET api/v1/items/:ID
	- Accepts comma separated list of IDs
**/
	.get(function(req, res) {
		
	})



// REGISTER OUR ROUTES -------------------------------
app.use('/api/v1', router); //add v1 prefix for all requests

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);