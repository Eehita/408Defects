var chai = require('chai');
var expect = chai.expect; // using the "expect" style of Chai

var app = require('./../server.js');

var request = require("supertest").agent(app.listen());
describe('sendToRecast', function() {
	  it('sendToRecast() should return string if intent was parsed', function(sendToRecast) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(sendToRecast);

	  });
	  it('sendToRecast() should return an error if intent was unable to be parsed', function(sendToRecast) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(sendToRecast);

	  });
});