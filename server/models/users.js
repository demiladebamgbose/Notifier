const mongoose = require('mongoose');
const { Schema } = mongoose;

// user schema definition
const UserSchema = new Schema({
  email: {
    type: String, required: true, unique: true, index: true,
  },
  phoneNumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  token: { type: String },
});

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', (next) => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

// Exports the UserSchema for use elsewhere.
module.exports = mongoose.model('user', UserSchema);
