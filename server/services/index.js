const firebase = require('firebase');
const FCM = require('fcm-push');
const users = require('../controllers/users');
const Twilio = require('twilio');
require('firebase/firestore');

// Firebase Config gotten from your env file
const firebaseConfig = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_AUTH_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBSE_SENDER_ID,
});

const Jusibe = require('jusibe');

const jusibe = new Jusibe(process.env.JUSIBE_ACCESS_KEY, process.env.JUSIBE_TOKEN);

const fcm = new FCM(process.env.FIREBASE_CLOUD_MESSAGING);

/*
 Get Present Date and a leading zero if date is One word
 */
const d = new Date();
const presentDate = `${d.getFullYear()}-${(d.getMonth().length === 1) ?
  (d.getMonth() + 1) : `0${(d.getMonth() + 1)}`}-${(d.getDate().length === 1) ? `0${d.getDate()}` : d.getDate()}`;

/*
  Loops through Expired dates and adds the user to the database for Notification
 */
function intervalFunc() {
  fetchUserData().then((res) => {
    res.forEach((doc) => {
      const { email, phoneNumber, token } = doc.data();
      checkUserExist({ email, phoneNumber, token });
    });
  });
}

/*
  Fetches users with expiration date
 */
function fetchUserData() {
  const query = firebase.firestore()
    .collection('user')
    .where('expiration', '<=', presentDate);
  return query.get().then((querySnapShot) => querySnapShot);
}

/*
  Fetches users with expiration date
 */
function checkUserExist(data) {
  try {
    const response = users.getUser({ data, time: Date.now() });
    response.then((res) => res.length === 0 ? createUser(data) : null);
  } catch (err) {

  }
}

/*
  Creates new user
  Sends a push Notification
  Updates firebase to message status expired
 */
function createUser(data) {
  return new Promise((resolve, reject) => {
    try {
      const response = users.postUser(data);
      sendPushNotification(data.token, 'Your License has expired');
      sendSms(data.phoneNumber);
      updateDb(data.email).then(() => {
        response.then((dataObj) => resolve(dataObj));
      });
    } catch (err) {
    }
  });
}

/*
  Clear database
 */
function clearDatabase() {
  try {
    const response = users.removeUsers();
    response.then((res) => console.log(res));
  } catch (err) {

  }
}

function sendPushNotification(token, body) {
  const message = {
    to: token,
    notification: {
      title: 'Message',
      body,
    },
  };

  return fcm.send(message)
    .then((response) => {
      console.log('Successfully sent with response: ', response);
    })
    .catch((err) => {
      console.log('Something has gone wrong!');
      console.error(err);
    });
}

function updateDb(email) {
  return firebase.firestore()
    .collection('user')
    .doc(email).set({ verified: false, licenseMessage: 'Expired !!!' }, { merge: true }).then((res) => (res)).catch((err) => (err));
}

/*
  Send Sms using Jusibe and if it fails due to strange number, use Africa is talking
 */
function sendSms(phoneNumber, text) {
  const payload = {
    to: phoneNumber,
    from: 'Model Inc',
    message: text || 'Your license plate is expired',
  };

  jusibe.sendSMS(payload)
    .then((res) => {
      console.log(res.body);
    })
    .catch((err) => {
      sendInternationalNumber(phoneNumber, text);
    });
}

function sendInternationalNumber(phoneNumber, text) {
  const accountSid = process.env.TWILLO_UID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILLO_AUTH; // Your Auth Token from www.twilio.com/console

  const client = new Twilio(accountSid, authToken);

  client.messages.create({
    body: text || 'Your license is expired',
    to: phoneNumber, // Text this number
    from: '+18504047322', // From a valid Twilio number
  })
    .then((message) => console.log(message.sid));
}

module.exports = {
  intervalFunc, fetchUserData, checkUserExist, createUser, clearDatabase, updateDb, sendPushNotification, sendSms,
};
