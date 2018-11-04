var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect('');

var clientSchema = new schema({
	 phoneNumber : Number,
	 zipcode : Number,
	 notificationTemprature : Number
}, {collection : 'weatherNotification'});

var clientModel = mongoose.model('weatherNotification', clientSchema);

module.exports = clientModel;