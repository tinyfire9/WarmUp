var config = require('./config.js'),
	accountSid = config.accountSid,
	authToken = config.authToken,
	client = config.client;

var Sms = function(){}

Sms.prototype.sendSms = function(phoneNumber, messageBody, callback){
	client.messages.create({
		to : "'" + phoneNumber + "'",
		from : '+19287665019',
		body : messageBody
	}, function(err, message){
			callback(null, message);
	});
}

module.exports = new Sms();