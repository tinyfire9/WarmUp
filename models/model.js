var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect('mongodb://db_username:db_password@ds031711.mongolab.com:31711/heroku_app33339190');

var clientSchema = new schema({
	 phoneNumber : Number,
	 zipcode : Number,
	 notificationTemprature : Number
}, {collection : 'weatherNotification'});

var clientModel = mongoose.model('weatherNotification', clientSchema);

module.exports = clientModel;