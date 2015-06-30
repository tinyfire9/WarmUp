var accountSid = 'AC7e4b2165797346a1c01ff3dba72e5a27';
var authToken = 'aceffca115a7dcb55063b7b3e8db8f0c';
var client = require('twilio')(accountSid, authToken);

exports.client = client;
exports.accountSid = accountSid;
exports.authToken = authToken;