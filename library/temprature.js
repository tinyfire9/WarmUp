var YQL = require('yql');

var Temprature = function(){}

Temprature.prototype.checkTemprature = function(zipcode, callback){
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

module.exports = new Temprature();