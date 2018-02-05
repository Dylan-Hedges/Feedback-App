const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//"helper.Mail" - an object that takes alot of configuration and spits out a mailer (contains functions etc. from helper.Mail)
class Mailer extends helper.Mail {}

module.exports = Mailer;

