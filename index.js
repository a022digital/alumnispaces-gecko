var express = require('express');
var requestapi = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//Default Homepage
	app.get('/', function(request, response) {
		response.send('You have wondered far and come unto a land of glory.');		
	});
	
//Get list of available widget interfaces
	app.get('/widgets', function(request, response) {
	  response.send({available:['weather','date']});
	});

//Get Weather widget data
	app.get('/widgets/weather', function(request, response) {
		requestapi('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%202459115&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, apiresponse, body) {
			if (!error && apiresponse.statusCode == 200) {
			   var weather = JSON.parse(apiresponse.body);
			   var forecast = weather.query.results.channel.item;
			   //Format weather data for Geck-o-meter: https://developer.geckoboard.com/#geck-o-meter
			   var formatted = {
				   "item": forecast.condition.temp,
				   "min": {
					   "value": forecast.forecast[0].low
				   },
				   "max": {
					   "value": forecast.forecast[0].high
				   }
			   };
			   response.send(formatted);
			}
		});
	});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});