var Recipient = require('../library/recipient.js');

var Recipient = new Recipient();

exports.indexResponseHandler = function(req, res){
	res.render('index');
}

exports.addRecipientResponseHandler = function(req, res){
	Recipient.addRecipient(req.body.phoneNumber, req.body.zipcode, req.body.notificationTemprature, function(error, status){
		if(error)
		{
			throw Error(error);
		}
		if(status == "success")
		{
			res.render('index', { submitted : true});
		}
	});
}