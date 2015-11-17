var accountSid = process.env.accountSid;
var authToken = process.env.authToken;
var client = require('twilio')(accountSid, authToken);

exports.client = client;
exports.accountSid = accountSid;
exports.authToken = authToken;