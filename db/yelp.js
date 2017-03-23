var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var yelpSchema = new Schema({
  user_id: String,
  location: String,
  latitude: String,
  longitude: String,
  price_range: String
});

// creating model
var Yelp = mongoose.model('Yelp', yelpSchema);

// make this available to our users in our Node applications
module.exports = mongoose.model('Yelp', yelpSchema);
