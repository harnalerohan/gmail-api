const sendMail = require('../controller/controller');

const Router = require('express').Router();

Router.post('/sendmail', sendMail);

module.exports = Router;