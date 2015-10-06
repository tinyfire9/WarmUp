var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect('mongodb://db_username:db_password@ds029824.mongolab.com:29824/heroku_0mg52fll');

var clientSchema = new schema({
	 phoneNumber : Number,
	 zipcode : Number,
	 notificationTemprature : Number
}, {collection : 'weatherNotification'});

var clientModel = mongoose.model('weatherNotification', clientSchema);

module.exports = clientModel;