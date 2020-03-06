
const dotenv = require('dotenv').load();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
require('./server/config');
const services = require('./server/services');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to The Job!' }));

app.listen(port, () => {
  'use strict';
  console.log('Started on port ', port);
});

app.post('/send', (req, res) => {
  const {
    phoneNumber, text, token, email, displayName,
  } = req.body;
  services.sendSms(phoneNumber, text);
  services.sendPushNotification(token, text);
  res.status(200).json({ message: 'Sent Message' });
});

setInterval(services.intervalFunc, 1500);
setInterval(services.clearDatabase, (60000 * 360));
services.clearDatabase();


module.exports = app;
