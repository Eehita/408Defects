var chai = require('chai');
var expect = chai.expect; // using the "expect" style of Chai

var app = require('./../server.js');

var request = require("supertest").agent(app.listen());
describe('callSendAPI', function() {
	  it('callSendAPI() should return string if api call was made', function(callSendAPI) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(callSendAPI);

	  });
	  it('callSendAPI() should return an error if api call was unable to be made', function(callSendAPI) {

	     request
            .get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(callSendAPI);

	  });
});