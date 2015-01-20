var async = require('async');
var models = require('../models/model.js');
var clientModel = models.clientModel;

var PublicApis = require('./publicApis.js');
var Recipient = require('./recipient.js');

var WarmUp = function(){}

WarmUp.prototype = Object.create(Recipient.prototype);

WarmUp.prototype.sendsms = PublicApis.prototype.sendsms;

WarmUp.prototype.currentTemprature = PublicApis.prototype.currentTemprature;

WarmUp.prototype.checkTempratureAndSendSMS = function(){
	function wrap(callback)
	{
		callback();
	}
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
							WarmUp.prototype.sendsms(recipients[i].phoneNumber, weatherData.temprature, weatherData.city);
						}
					});
            	})(i)
			}	
		}
	});
}

module.exports = WarmUp;