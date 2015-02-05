var WarmUp = require('../library/warmUp.js');

var WarmUp = new WarmUp();

exports.indexResponseHandler = function(req, res){
	res.render('index');
}

exports.addRecipientResponseHandler = function(req, res){
	var messageBody;
	var degreeSign = String.fromCharCode(parseInt("00B0", 16));
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
		messageBody = "Hi, thank you for subscribing! The current temprature in " + weatherData.city + " is " +
					   weatherData.temprature + " " + degreeSign + "F. We will notify you every 12 hours, if the temprature is below " + 
					   req.body.notificationTemprature + " " + degreeSign + "F. -Sent from warmUp";
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