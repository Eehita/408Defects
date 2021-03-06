var chai = require('chai');
var expect = chai.expect; // using the "expect" style of Chai

var app = require('./../server.js');

var request = require("supertest").agent(app.listen());
describe('receivedPostback', function() {
	  it('receivedPostback() payload params : new_user', function(receivedPostback) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(receivedPostback);

	  });
	  it('receivedPostback() payload params : get_reviews', function(receivedPostback) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(receivedPostback);

	  });
	  it('receivedPostback() payload params : get_info', function(receivedPostback) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(receivedPostback);

	  });
	  it('receivedPostback() should return an error if message was unable to be sent', function(receivedPostback) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(receivedPostback);

	  });
});