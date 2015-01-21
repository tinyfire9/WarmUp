var WarmUp = require('../library/warmUp.js');

var WarmUp = new WarmUp();

exports.indexResponseHandler = function(req, res){
	res.render('index');
}

exports.addRecipientResponseHandler = function(req, res){
	var messageBody;
	WarmUp.currentTemprature(req.body.zipcode, function(error, weatherData){
		if(error)
		{
			throw Error(error);
		}
		if(!weatherData)
		{
			return (res.render('index', { submitted : false,
								  error: "Oops! The zipcode, " + req.body.zipcode + ", does not exists!"
								}));
		}
		messageBody = "Hi, Thanks for subscribing! The current temprature in " + weatherData.city + " is " + weatherData.temprature + ". We will notify you when the temprature is below " + req.body.notificationTemprature + "every 24 hours. -warmUp";
		WarmUp.sendsms(req.body.phoneNumber, messageBody, function(error, message){
			if(error)
			{
				throw Error(error);
			}
			if(!message)
			{
				return(res.render('index', { submitted : false, 
											 error: "Oops! The phone number, " + req.body.phoneNumber + ", does not exists!"
													}));
			}

		});
		WarmUp.addRecipient(req.body.phoneNumber, req.body.zipcode, req.body.notificationTemprature, function(error, status){
			if(error)
			{
				throw Error(error);
			}
			if(status == "success")
			{
				res.render('index', { submitted : true});
			}
		});		
	});
}