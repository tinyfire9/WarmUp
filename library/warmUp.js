var models = require('../models/model.js');
var clientModel = models.clientModel;

var PublicApis = require('./publicApis.js');
var Recipient = require('./recipient.js');

var WarmUp = function(){}

WarmUp.prototype = Object.create(Recipient.prototype);

WarmUp.prototype.sendsms = PublicApis.prototype.sendsms;

WarmUp.prototype.currentTemprature = PublicApis.prototype.currentTemprature;

WarmUp.prototype.checkTempratureAndSendSMS = function(){
	var messageBody;
	var degreeSign = String.fromCharCode(parseInt("00B0", 16));
	WarmUp.prototype.queryRecipient(function(error, recipients){
		if(error)
		{
			throw Error(error);
		}
		if(recipients)
		{	
			for(var i = 0; i < recipients.length; i++)
			{
				(function(i)
				{
					WarmUp.prototype.currentTemprature(recipients[i].zipcode, function(error, weatherData){
						if(error)
						{
							throw Error(error);
						}
						if(weatherData.temprature < recipients[i].notificationTemprature)
						{
							messageBody = "Hey, the weather in " + weatherData.city + " is " + weatherData.temprature + " " + degreeSign + "F. -Sent from warmUp."
							WarmUp.prototype.sendsms(recipients[i].phoneNumber, messageBody, function(error, message){
								if(error)
								{
									throw Error(error);
								}
							});
						}
					});
            	})(i)
			}	
		}
	});
}

module.exports = WarmUp;