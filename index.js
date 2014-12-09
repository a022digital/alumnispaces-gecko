var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//Default Homepage
	app.get('/widgets', function(request, response) {
		response.send('You have wondered far and come unto a land of glory.');		
	});
	
//Get list of available widget interfaces
	app.get('/widgets', function(request, response) {
	  response.send({available:['weather','date']});
	});

//Get Weather widget data
	app.get('/widgets/weather', function(request, response) {
	  response.send('working on it');
	});	


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});