const YQL = require('yql');

const Temprature = function(){}

Temprature.prototype.checkTemprature = function(zipcode, callback){
	var weatherData;
	this.getWOEIDByZipCode(zipcode, (woeidErr, woeid) => {
		const query = new YQL('SELECT * FROM weather.forecast WHERE woeid = ' + woeid );

		query.exec((err, data) => {
			// console.log({ woeidErr, query, err });
			// console.dir(data, { depth: null, color: true });
			const location = data.query.results.channel.location;
			const condition = data.query.results.channel.item.condition;
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
	});

}

Temprature.prototype.getWOEIDByZipCode = function(zipcode, callback) {
	const query = new YQL('select woeid from geo.places where text =' + zipcode + ' limit 1');

	query.exec((err, data) => {
		
		try {
			const woeid = data.query.results.place.woeid;
			callback(null, woeid);
		} catch (e) {
			callback(e, null);
		}
	})

};

module.exports = new Temprature();