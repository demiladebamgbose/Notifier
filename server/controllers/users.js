const User = require('../models/users');

/*
  User object for creating Data
  returns Promise
 */
function postUser(users) {
  const newUser = new User(users);

  return new Promise((resolve, reject) => {
    newUser.save((err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
}

/*
  Gets user data with email and if present date is less than created
  returns Promise
 */
function getUser({ data: { email }, time }) {
  return new Promise((resolve, reject) => {
    User.find({
      $and: [{ email },
        { createdAt: { $lt: time } }],
    }, (err, docs) => {
      if (err) {
        reject(err);
      }
      // If no errors, send it back to the client
      resolve(docs);
    });
  });
}

/*
  Remove User data
  returns Promise
 */
function removeUsers() {
  return new Promise((resolve, reject) => {
    User.remove({}, (err, result) => {
      if (err) { reject(err); }

      resolve(result);
    });
  });
}

module.exports = {
  getUser, postUser, removeUsers,
};
