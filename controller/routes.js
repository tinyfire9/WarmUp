var WarmUp = require('../library/warmUp.js'),
	Subscribe = require('../library/subscribe.js'),
	statusCodes = require('../library/statusCodes.js');

exports.indexResponseHandler = function(req, res){
	res.render('layout', {statusCode : statusCodes.index.appIndex});
}

exports.subscriptionResponseHandler = function(req, res){
	res.render('layout', {statusCode : statusCodes.index.subscriptionIndex});
}

exports.addSubscriptionResponseHandler = function(req, res){
	var phoneNumber = req.body.phoneNumber,
		zipcode = req.body.zipcode,
		notificationTemprature = req.body.notificationTemprature;
	Subscribe.querySubscriber(phoneNumber, function(response){
		if(!response)
		{
			WarmUp.checkTempratureAndSmsWelcomeMessage(phoneNumber, zipcode, notificationTemprature, function(response){
				console.log(response);
				res.render('layout', response);
			});
		}
		else
		{
			res.render('layout', {
				statusCode : statusCodes.error.error, 
				error : "Sorry, you have already subscribed!"
			});
		}
	});
}

exports.updateSubscriptionResponseHandler = function(req, res){
	res.render('layout', {statusCode : statusCodes.index.updateSubscriptionIndex});
}

exports.updateSubscriptionInfoResponseHandler = function(req, res){
	Subscribe.querySubscriber(req.body.phoneNumber, function(subscriberInfo){
		if(subscriberInfo)
		{
			res.render('layout', {
				statusCode : statusCodes.subscription.updateSubscription, 
				subscriberInfo : subscriberInfo
			});
		}
		else
		{
			res.render('layout', {
				statusCode : statusCodes.error.error,
				error : 'Sorry! We cound\'t find you phone number. Try again!',
				subscriberInfo : null
			});
		}
	});
}

exports.updateSubscriptionStatusResponseHandler = function(req, res){
	var phoneNumber = req.params.phoneNumber, 
		zipcode = req.body.zipcode,
		notificationTemprature = req.body.notificationTemprature;
	WarmUp.checkTempratureAndSmsUpdate(phoneNumber, zipcode, notificationTemprature, function(response){
		res.render('layout', response);
	});
}

exports.unsubscriptionResponseHandler = function(req, res){
	res.render('layout', {statusCode : statusCodes.index.unsubscriptionIndex, error : null});
}

exports.unsubscriptionInfoResponseHandler = function(req, res){
	var phoneNumber = req.body.phoneNumber;
	Subscribe.querySubscriber(phoneNumber, function(subscriberInfo){
		if(subscriberInfo)
		{
			console.log(subscriberInfo);
			res.render('layout', {
				statusCode : statusCodes.subscription.unsubscription,
				subscriberInfo : subscriberInfo, 
				error : null
			});
		}
		else
		{
			res.render('layout', {
				statusCode : statusCodes.error.error, 
				error : 'Phone number not found. Please check and try again. Thank you!'})
		}
	});
}

exports.unsubscriptionStatusResponseHandler = function(req, res){
	var phoneNumber = req.params.phoneNumber;
	WarmUp.smsUnsubscription(phoneNumber, function(response){
		res.render('layout', response);
	});
}
