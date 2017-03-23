var chai = require('chai');
var expect = chai.expect; // using the "expect" style of Chai

var app = require('./../server.js');

var request = require("supertest").agent(app.listen());
describe('botConnectionTests', function() {

	it('testing if we are able to connecting to Facebook Messenger', function(done) {

	    request
        	.get("/")
            .expect("Official Page for the chatbot Aidera!")
            .end(done);

	});
	
	it('get Webhook test: respond with appropriate string, if not then error message', function() {

	    request
            .get("/webhook/")
            .expect("Got a webhook request!")
            .end();

	});


	it('post Webhook test: respond with appropriate string, if not then error message', function() {

		request
            .post("/webhook/")
            .expect("Came to post From facebook")
            .end()
	});
});


