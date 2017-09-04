const twilio = require('twilio');
const account = require('./twilio_account.json');

module.exports = new twilio.Twilio(account.accountSid, account.authToken);