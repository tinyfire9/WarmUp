var clientModel = require('../models/model.js');

var Subscribe = function(){}

Subscribe.prototype.addSubscriber = function(phoneNumber, zipcode, notificationTemprature, callback){
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

Subscribe.prototype.querySubscriber = function(phoneNumber, callback){
	clientModel.findOne({phoneNumber : phoneNumber}, function(error, subscriberInfo){
		if(error)
		{
			throw Error(error);
		}
		callback(subscriberInfo);
	});
}

Subscribe.prototype.querySubscribers = function(callback){
	clientModel.find({}, function(error, clients){
		if(error)
		{
			throw Error(error);
		}
		callback(null, clients);
	});
}

Subscribe.prototype.removeSubscriber = function(phoneNumber, callback){
	clientModel.findOne({phoneNumber : phoneNumber}, function(error, subscriber){
		if(subscriber)
		{
			clientModel.remove({phoneNumber : phoneNumber}, function(error, response){
				try{
					callback(true);
				}
				catch(error)
				{
					console.log(Error(error));
				}
			});
		}
		else
		{
			callback({error : 'number not found'});
		}
	});
}

Subscribe.prototype.updateSubscriberInfo = function(phoneNumber, update, callback){
	clientModel.findOne({phoneNumber : phoneNumber}, function(error, recipientInfo){
		console.log({ error, recipientInfo });
		if(error)
		{
			console.log(Error(error));
		}
		if(update.zipcode)
		{
			recipientInfo.zipcode = update.zipcode;
		}
		if(update.notificationTemprature)
		{
			recipientInfo.notificationTemprature = update.notificationTemprature;
		}
		recipientInfo.save(function(error, response){
			if(error)
			{
				throw Error(error);
			}
			callback(response);
		});
	});
}

module.exports = new Subscribe();