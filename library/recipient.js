var models = require('../models/model.js');
var clientModel = models.clientModel;


var Recipient = function(){}

Recipient.prototype.addRecipient = function(phoneNumber, zipcode, notificationTemprature, callback){
	var newClient = new clientModel({   phoneNumber : phoneNumber,
										zipcode : zipcode,
										notificationTemprature : notificationTemprature
									});
	newClient.save(function(error){
		if(error)
		{
			throw Error(error);
		}
		callback(null, "success");
	});
}

Recipient.prototype.queryRecipient = function(callback){
	clientModel.find({}, function(error, clients){
		if(error)
		{
			throw Error(error);
		}
		callback(null, clients);
	});
}

module.exports = Recipient;