var express = require('express')
, app = express()
, mongoose = require('mongoose')
, serverStatic = require('serve-static')
, methodOverride = require('method-override')
, bodyParser = require('body-parser')
, errorHandler = require('errorhandler')
, jade = require('jade')
, Recipient = require('./library/recipient.js')
, WarmUp = require('./library/warmUp.js')
, routes = require('./controller/routes.js');


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(serverStatic(__dirname + '/public'));
app.set('/views',__dirname + '/views');
app.set('view engine', 'jade');


switch(app.get('env'))
{
	case "development":
		app.use(errorHandler({dumpExceptions : true, showStack: true}));
		break;
	case "production":
		app.use(errorHandler());
		break;
}

app.get('/', routes.indexResponseHandler);

app.post('/', routes.addRecipientResponseHandler)

var WarmUp = new WarmUp();
setInterval(function(){
	WarmUp.checkTempratureAndSendSMS();
}, 60000 * 60 * 24);

console.log('Server running on port 3000 . . . ');
app.listen(process.env.PORT || 3000);