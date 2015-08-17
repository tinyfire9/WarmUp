var express = require('express')
, app = express()
, serverStatic = require('serve-static')
, methodOverride = require('method-override')
, bodyParser = require('body-parser')
, errorHandler = require('errorhandler')
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
app.get('/subscribe', routes.subscriptionResponseHandler);
app.post('/subscribe', routes.addSubscriptionResponseHandler);

app.get('/update', routes.updateSubscriptionResponseHandler);
app.post('/update/subscriptionInfo', routes.updateSubscriptionInfoResponseHandler);
app.post('/update/:phoneNumber', routes.updateSubscriptionStatusResponseHandler);

app.get('/unsubscribe', routes.unsubscriptionResponseHandler);
app.post('/unsubscribe/unsubscriptionInfo', routes.unsubscriptionInfoResponseHandler);
app.post('/unsubscribe/:phoneNumber', routes.unsubscriptionStatusResponseHandler);

console.log('Server running on port 3000 . . . ');
app.listen(process.env.PORT || 3000);