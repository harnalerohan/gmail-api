const { sendEmail } = require('../controller/controller');

const Router = require('express').Router();

Router.post('/sendmail', sendEmail );

module.exports = Router;