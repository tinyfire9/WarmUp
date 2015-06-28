var clientModel = require('../models/model.js');

var Temprature = require('./temprature.js'),
	Subscribe = require('./subscribe.js'),
	Sms = require('./sms.js');

var WarmUp = function(){}

WarmUp.prototype.checkTempratureAndSmsTemprature = function(){
	var messageBody,
			degreeSign = String.fromCharCode(parseInt("00B0", 16));
	Subscribe.querySubscribers(function(error, recipients){
		if(error)
		{
			throw Error(error);
		}
		if(recipients)
		{	
			for(var i = 0; i < recipients.length; i++)
			{

				Temprature.checkTemprature(recipients[i].zipcode, function(error, weatherData){
					if(error)
					{
						throw Error(error);
					}
					if(weatherData.temprature < recipients[i].notificationTemprature)
					{
						messageBody = "Hey, the weather in " + weatherData.city + " is " + weatherData.temprature + " " + degreeSign + "F. -Sent from warmUp."
						Sms.sendSms(recipients[i].phoneNumber, messageBody, function(error, message){
							if(error)
							{
								throw Error(error);
							}
							console.log('Message sent to subscriber with this information, [' + recipients[i].phoneNumber + ', ' + weatherData.city + weatherData.temprature + '] at ' + new Date().toString());
						});
					}
				});
			}	
		}
	});
}

WarmUp.prototype.checkTempratureAndSmsWelcomeMessage = function(phoneNumber, zipcode, notificationTemprature, callback){
	var messageBody,
		degreeSign = String.fromCharCode(parseInt("00B0", 16));
	Temprature.checkTemprature(zipcode, function(error, weatherData){
		if(error)
		{
			throw Error(error);
		}
		if(!weatherData)
		{
			callback({ submitted : false, error: "Oops! The zipcode, " + zipcode + ", does not exists!" });
		}
		messageBody = "Hi, thank you for subscribing! The current temprature in " + weatherData.city + " is " +
					   weatherData.temprature + " " + degreeSign + "F. We will notify you every 12 hours, if the temprature is below " + 
					   notificationTemprature + " " + degreeSign + "F. -Sent from warmUp";
		Sms.sendSms(phoneNumber, messageBody, function(error, message){
			if(error)
			{
				throw Error(error);
			}
			if(message)
			{
				Subscribe.addSubscriber(phoneNumber, zipcode, notificationTemprature, function(error, subscribtion){
					if(error)
					{
						throw Error(error);
					}
					if(subscribtion)
					{
						callback(true);
					}
					else
					{
						callback(false);
					}
				});
			}
			else
			{
				callback({ submitted : false, error: "Oops! The phone number, " + phoneNumber + ", does not exists!" });
			}
		});
	});
}

WarmUp.prototype.checkTempratureAndSmsUpdate = function(phoneNumber, zipcode, notificationTemprature, callback){
	var messageBody,
		update,
		degreeSign = String.fromCharCode(parseInt("00B0", 16));
	Temprature.checkTemprature(zipcode, function(error, weatherData){
		if(error)
		{
			throw Error(error);
		}
		if(!weatherData)
		{
			callback({ submitted : false, error: "Oops! The zipcode, " + zipcode + ", does not exists!" });
		}
		messageBody = "Thank you for updating your notification preferences! Your current subscribtion information is as follows :\n\tPhone number : " +
					phoneNumber + ", \n\t zipcode : " + zipcode + "\n\t Notification temprature : " + notificationTemprature + " " + degreeSign + "F. -Sent from warmUp";
		Sms.sendSms(phoneNumber, messageBody, function(error, message){
			if(error)
			{
				throw Error(error);
			}
			if(!message)
			{
				callback({ submitted : false, error: "Oops! The phone number, " + phoneNumber + ", does not exists!"});
			}
			else
			{
				update = {
					zipcode : zipcode,
					notificationTemprature : notificationTemprature
				};
				Subscribe.updateSubscriberInfo(phoneNumber, update, function(success){
					if(success)
					{
						callback(true);
					}
					else
					{
						callback(false);
					}
				});
			}

		});
	});
}

WarmUp.prototype.smsUnsubscribtion = function(phoneNumber, callback){
	var messageBody = 'We miss you :( ! - Sent from warmUp';
	Sms.sendSms(phoneNumber, messageBody, function(error, message){
		if(error)
		{
			throw Error(error);
		}
		if(message)
		{
			Subscribe.removeSubscriber(phoneNumber, function(subscribtion){
				if(subscribtion == true)
				{
					callback(true);
				}
				else
				{
					callback(false);
				}
			});
		}
	});
}
module.exports = new WarmUp();