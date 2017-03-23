var chai = require('chai');
var expect = chai.expect; // using the "expect" style of Chai

var app = require('./../server.js');

var request = require("supertest").agent(app.listen());
describe('sendTextMessage', function() {
	  it('sendTextMessage() should return string if message was sent', function(sendTextMessage) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(sendTextMessage);

	  });
	  it('sendTextMessage() should return an error if message was unable to be sent', function(sendTextMessage) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(sendTextMessage);

	  });
});