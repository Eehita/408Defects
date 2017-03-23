var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  user_id: String,
  yelp_location: String,
  location: String,
  latitude: String,
  longitude: String,
  request_type: String,
  price_range: String,
  airbnb_id: String
});

// creating model
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema);
