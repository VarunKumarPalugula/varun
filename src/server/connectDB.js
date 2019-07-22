var mongoose = require('mongoose');

var userDetailsSchema = new mongoose.Schema({
  username: String,
  email: String,
  number: Number,      
  password: String
});

module.exports = mongoose.model('userDetails', userDetailsSchema);
