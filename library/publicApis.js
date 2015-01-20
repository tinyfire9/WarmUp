var YQL = require('yql');

var accountSid = 'AC7e4b2165797346a1c01ff3dba72e5a27'; 
var authToken = 'aceffca115a7dcb55063b7b3e8db8f0c'; 
var client = require('twilio')(accountSid, authToken);


var PublicApis = function(){}

PublicApis.prototype.currentTemprature = function(zipcode, callback){
	var weatherData;
	var query = new YQL('SELECT * FROM weather.forecast WHERE (location = ' + zipcode + ')');

	query.exec(function(err, data) {
		var location = data.query.results.channel.location;
		var condition = data.query.results.channel.item.condition;
		if(!location || !condition)
		{
			weatherData = null;
		}
		else
		{
			weatherData = {
				city : location.city + ', ' + location.region,
				temprature : condition.temp
			}			
		}
		callback(null, weatherData);
	});
}

PublicApis.prototype.sendsms = function(phoneNumber, temprature, city){
	client.messages.create({
		to : "'" + phoneNumber + "'",
		from : '+19287665019',
		body : "Hey, the weather in " + city + " is " + temprature + " degrees. -Sent from WarmUp."
	}, function(error){
		if(error)
			throw Error(error);
	});
}

module.exports = PublicApis;