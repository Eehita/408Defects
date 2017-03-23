var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var feedbackSchema = new Schema({
  advice: String,
  user_id: String,
  user_firstName: String
});

// creating model
var Feedback = mongoose.model('Feedback', feedbackSchema);

// make this available to our users in our Node applications
module.exports = mongoose.model('Feedback', feedbackSchema);
