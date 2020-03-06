# Notifier System
[![Build Status](https://travis-ci.org/jadewale/Notifier.svg?branch=master)](https://travis-ci.org/jadewale/Notifier)[![Maintainability](https://api.codeclimate.com/v1/badges/f7b6527c53e8f3cc2484/maintainability)](https://codeclimate.com/github/jadewale/license-plate/maintainability)    [![Test Coverage](https://api.codeclimate.com/v1/badges/f7b6527c53e8f3cc2484/test_coverage)](https://codeclimate.com/github/jadewale/license-plate/test_coverage)


Notifier is a cron job which helps check a field on firebase and sends a notification to the user as push notification and also an sms every 6 hours. It was used here as a plate number notification api

Development
-----------
This application is created using Nodejs environment. It implements [**Express**](http://expressjs.com/) as the routing framework and [**Mongoose**](http://mongoosejs.com/), an object modeling package, to interact with MongoDB. [**Firebase**](https://firebase.google.com/) is used to get user information and user token and also sends a push notification. [**Twillo**](https://twilio.com/) is used to send sms to International Numbers.
[**Jusibe**](https://jusibe.com/) also used to send SMS to local Numbers (+234) . If The application sms fails for a local number, it uses Twillo to send an sms.


Installation.
-------------
1. Install [**Nodejs**](www.nodejs.org) and [**MongoDB**](www.mongodb.org)
2. Clone this repo or download the zipped file.
3. Navigate to the master branch.
4. Run
    ```
    npm install or yarn

    ```
    This will install the required dependencies.

5. Run
    ```
    npm test

    ```
    to run the tests.
  
6. Run
    ```
    npm start

    ```
7. .env
    ```
     FIREBASE_API_KEY=YOUR KEY
     FIREBASE_AUTH_DOMAIN=YOUR APP DOMAIN
     FIREBASE_AUTH_DATABASE_URL=YOUR_DATABASE_URL
     FIREBASE_PROJECT_ID=PROJECT_ID
     FIREBASE_STORAGE_BUCKET=YOUR STORAGE BUCKET
     FIREBSE_SENDER_ID=YOUR_SENDER_D
     JUSIBE_ACCESS_KEY=JUSIBE_ACESS_KEY
     JUSIBE_TOKEN=JUSIBE_TOKEN
     FIREBASE_CLOUD_MESSAGING=YOUR_FIREBASE_CLOUD_MESSAGING
     AFRICA_TALKING=YOUR_AFRICA_IS_TALKING
     MONGO_URI=YOUR_MONGO_DB_URI
     TWILLO_UID=YOUR_TWILLO_UIID
     TWILLO_AUTH=YOUR_TWILLO_AUTH 
    ```
Use [**Postman**](https://www.getpostman.com/) to consume the API.

8. Well...enjoy.

## Code Example

**Sends a Notification**
  ```
  POST - /send

  Post data
  {
    email: 'lade@gmail.com', // Optional
    token: 'example@host.com' // Required
    phoneNumber : 'lastname', // Required, always try to put the Country code
    text: 'Hello World', // Required
  }
  ```

**********

## API Reference

API endpoints currently supported.

_*/*_

Request type | Endpoint | Action 
------------ | -------- | ------
POST | /send | Sends an sms and push Notification



Testing.
--------
This application has been tested using [**Mocha**](https://mochajs.org), which is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun.

Thank You.

#### Demilade Bamgbose |
 
