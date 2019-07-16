var mongoose = require('mongoose');

var userDetailsSchema = new mongoose.Schema({
  username: String,
  password: String,
  phoneNumber: Number,
  rememberMe: Boolean
});

module.exports = mongoose.model('userDetails', userDetailsSchema);
