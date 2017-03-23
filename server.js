'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');
const app = express();
const recast = require('recastai');
const config = require('./config');
const urls = require('./urls');

/*services section*/
const fb = require('./services/facebook-service');
const yelp = require('./services/yelp-service');
const airbnb = require('./services/airbnb-service');

/*intents section*/
const greetings = require('./intents/greetings');
const goodbyes = require('./intents/goodbyes');
const help = require('./intents/help');
const feedback = require('./intents/feedback');
const recCuisine = require('./intents/recCuisine');

/*Recast client*/
const client = new recast.Client(config.recast_token, 'en');

//grabbing user model
var User = require('./db/user');

//Database configuration
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.urlHeroku); // connect to our database


/*APP SETTINGS DO NOT TOUCH THESE. THEY REMAIN THE SAME ALWAYS*/
app.set('port', (process.env.PORT || 8080));
if(!module.parent) {
    app.listen(app.get('port'), function() {
		console.log('running on port', app.get('port'));
	});
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/*GET METHOD TO CONNECT TO WEBPAGE FOR AIDERA*/
app.get('/', function( req, res) {
	res.send('Official Page for the chatbot Aidera!');
});

/*GET METHOD TO CONNECT TO FACEBOOK*/
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'aidera') {
		res.send(req.query['hub.challenge']);
		console.log("Got a webhook request");
	}
	res.send('Error, wrong token');
});

app.post('/yelp_lat_lon_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var lat = data.lat;
	var lon = data.long;

	yelp.restaurantSearch_lat_lon(fbid, lat, lon).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/yelp_loc_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var location = data.location;

	yelp.restaurantSearch_location(fbid, location).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/yelp_price_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var lat = data.lat;
	var lon = data.long;
	var price = data.num;

	yelp.restaurantSearch_price(fbid, lat, lon, price).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/yelp_price_loc_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var location = data.location;
	var price = data.num;

	yelp.restaurantSearch_price_location(fbid, location, price).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});


app.post('/yelp_categories_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var location = data.location;
	var categories = data.text;

	yelp.restaurantSearch_categories(fbid, location, categories).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/airbnb_loc_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var location = data.location;

	airbnb.listingSearch_location(fbid, location).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});


app.post('/airbnb_lat_long_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var lat = data.lat;
	var lon = data.long;

	airbnb.listingSearch_lat_long(fbid, lat, lon).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/airbnb_date_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var checkin = data.checkin;
	var checkout = data.checkout;

	airbnb.listingSearch_date(fbid, checkin, checkout).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/airbnb_date_loc_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var loc = data.location;
	var checkin = data.checkin;
	var checkout = data.checkout;

	airbnb.listingSearch_date_location(fbid, checkin, checkout, loc).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/airbnb_host_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var hostId = data.hostId;

	airbnb.listingSearch_host(fbid, hostId).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});
});

app.post('/server_downtime_test', function(req, res) {

	var messageText = req.body.text;
	console.log("message is : " + messageText);
	//console.log(data);
	//var fbid = data.fbid;
	//console.log(fbid + "<---- this is fbid");
	//var hostId = data.hostId;

	/*airbnb.listingSearch_host(fbid, hostId).then(function(elements) {
		var message = fb.createCards(fbid, elements);
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log("yelp got an error  -> " + error);
	});*/
	if (serverDowntime(messageText)) {
		res.send("Sever downtime maintenance scheduled. 200 OK.");
	}
});

/*POST METHOD TO GET MESSAGE FROM FACEBOOK*/
app.post('/webhook/', function(req, res) {

	fs.writeFile('fb.json', req, (err) => {
		if (err) throw err;
	});
	//console.log(req.body);
	console.log(JSON.stringify(req.body) + "\n\n\n\n\n\n\n\n");
	console.log(JSON.stringify(req.body.entry) + "\n\n\n\n\n\n");
	var data = req.body;

	if (data.object == 'page') {
		data.entry.forEach(function(pageEntry) {

			pageEntry.messaging.forEach(function(messagingEvent) {
				if (messagingEvent.message) {
					console.log("Got a message from Facebook:");

					//checking if User is present in DB
					User.findOne({ user_id: messagingEvent.sender.id }, function(err, user) {

						// if error connecting to DB
						if (err) throw err;
						//if user is not a first timer.
						if (user) {
							//Send a normal reply back.
						}

						//If user is new, we add user to our DB.
						else {
							//creating user object
							var newUser = User({
								user_id: messagingEvent.sender.id,
							});
							//saving user object
							newUser.save(function(err) {
								if (err) throw err;
								console.log('User created!');
							});
						}
					});
					receivedMessage(messagingEvent);
				}
				else if (messagingEvent.postback) {
					receivedPostback(messagingEvent);
				}
				else {
					//console.log("Webhook received messaging event which is not handled");
				}
			});
		});
		res.sendStatus(200);
	}
});

function serverDowntime(messageText) {
	var adminID = ["501253886664954", "1158032884308951"]; //add all admins sender ID
			//if (adminID.indexOf(senderID) > -1) {

			var arrTime = messageText.split(" ");
			User.find({}, function(err, users) {
				users.forEach(function(user) {
					var message = fb.createTextMessage(user.user_id, "The server is going to be down from " + arrTime[1] + " to "
					+ arrTime[2] + ".\nSorry for the inconvenience.");
					console.log("Response status -> " + fb.sendMessageToFacebook(message));
    			});
  			});
  			return true;
}

function receivedMessage(event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;
	var message = event.message;
	var metadata = message.metadata;

	var messageText = message.text;
	var messageAttachments = message.attachments;
	var isEcho = message.is_echo;
	var quickReply = message.quick_reply;

	if (isEcho) {
		return;
	}
	else if (quickReply) {
		var quickReplyPayload = quickReply.payload;
		var payload = quickReplyPayload.split(" ");

		//console.log("user found without location");
		User.findOne({ user_id: senderID }, function(err, user) {
			if (err) {
				console.log(err);
			}
			else {
				//console.log("user has no location or lat and lon");
				if (user.location == null) {
					message = fb.createTextMessage(sender, "Please send your location using facebooks location sending service");
					console.log("Response status -> " + fb.sendMessageToFacebook(message));
					user.request_type = "get_price";
					user.save(function(error, result) {
						if (error){
							console.log(error);
						}
					});
					console.log(user.latitude + " <- lat lon -> " + user.longitude);
				}
				else {
					yelp.restaurantSearch_price_location(senderID, user.location, payload[1]).then(function(elements) {
					var message = fb.createCards(senderID, elements);
					console.log("Response status -> " + fb.sendMessageToFacebook(message));
					}).catch(function(error) {
						console.log("error with price api yelp");
						console.log(error);
					});
				}
			}
		});
		console.log("Response status -> " + fb.sendMessageToFacebook(message));
		return;
	}

	if (messageText) {
		//sends a server downtime message to all users
		if (messageText.includes('Server-downtime')) {
			//var adminID = ["501253886664954", "1158032884308951"]; //add all admins sender ID
			//if (adminID.indexOf(senderID) > -1) {
			//var arrTime = messageText.split(" ");

			//User.find({}, function(err, users) {
			//	users.forEach(function(user) {
			//		var message = fb.createTextMessage(user.user_id, "The server is going to be down from " + arrTime[1] + " to "
			//		+ arrTime[2] + ".\nSorry for the inconvenience.");
			//		console.log("Response status -> " + fb.sendMessageToFacebook(message));
    		//	});
  			//});
  			//} else {
			//	var message = fb.createTextMessage(senderID, "Dont act too cool. You're not a developer!");
			//	console.log("Response status -> " + fb.sendMessageToFacebook(message));
			//}
			serverDowntime(messageText);
		} else {
			sendToRecast(senderID, messageText);
		}
	}
	else if (messageAttachments) {
		messageAttachments.forEach(function(attachment) {
			console.log("The message type is: " + attachment.type);
			if (attachment.type == 'image') {
				console.log("The attachment url is : " + attachment.payload.url);
				sendImageMessage(senderID, attachment.payload.url);
			}
			else if (attachment.type == 'location') {
				console.log("The attachment is a location from user " + senderID);
				User.findOne({ user_id: senderID }, function(error, user) {
					if (error) {
						console.log("error " + error);
					}
					else {
						var lat = attachment.payload.coordinates.lat;
						var long = attachment.payload.coordinates.long;
						console.log("User lat is " + attachment.payload.coordinates.lat + "  and user long is " + attachment.payload.coordinates.long);
						console.log("User request type is " + user.request_type);

						if (user.request_type === "search_nearby_restaurants") {
							yelp.restaurantSearch_lat_lon(senderID, lat, long).then(function(elements) {
							//no error
							message = fb.createCards(senderID, elements);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
							//error
							console.log("yelp got an error  -> " + error);
							});
						}
						else if (user.request_type === "reviews-restaurants") {
							yelp.restaurantSearch_reviews(sender, "four-barrel-coffee-san-francisco").then(function(elements) {
							//no error
							message = fb.createCards(sender, elements);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								//error
							});
						}
						else if (user.request_type === "get_price") {
							yelp.restaurantSearch_price(senderID, lat, long, payload[1]).then(function(elements) {
							var message = fb.createCards(senderID, elements);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								console.log("error with price api yelp");
								console.log(error);
							});
						}
						else if (user.request_type === "listing-search") {
							airbnb.listingSearch_lat_long(senderID, lat, long).then(function(elements) {
								//no error
								message = fb.createCards(senderID, elements);
								console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								//error
								console.log(error);
							});
						}
						else if (user.request_type === "date-search") {
							airbnb.listingSearch_date(senderID, res.entities[0]['raw'], res.entities[2]['raw'], lat, long).then(function(elements) {
								message = fb.createCards(senderID, elements);
								console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								console.log(error);
								console.log("Got an error in airbnb and got error");
							});
						}
					}
				});
			}
		});
	}
}

function receivedPostback(event) {
	var senderID = event.sender.id;
	var timeOfPostback = event.timestamp;

	var payload = event.postback.payload;
	var payload_params = payload.split(" ");
	if (payload_params[0] === "new_user") {
		console.log("Postback was : " + payload_params[0]);
		fb.sendMessageToNewUser(senderID);
	}
	else if (payload_params[0] === "get_reviews") {
		console.log("Postback was : " + payload_params[0]);
		yelp.restaurantSearch_reviews(senderID, payload_params[1]);
	}
	else if (payload_params[0] === "get_host") {
		console.log("Postback was : " + payload_params[0] + ' ' + payload_params[1]);
			airbnb.listingSearch_host(payload_params[2], payload_params[1]).then(function(elements) {
			var message = fb.createCards(payload_params[2], elements);
		console.log("Response status -> " + fb.sendMessageToFacebook(message));
		}).catch(function(error) {
			console.log(error);
			console.log("Got an error in airbnb and got error");
		});
	}
	else if (payload_params[0] === "get_airbnb_reviews") {
		console.log("Postback was : " + payload_params[0] + ' ' + payload_params[1]);
		airbnb.listing_review(payload_params[2], payload_params[1]);
	}
	else if (payload_params[0] === "get_info") {
		console.log("Postback was : " + payload_params[0]);
		yelp.sendRestaurantInfo(senderID, payload_params[1]).then(function(data) {
			var photo_cards = yelp.createBusinessPhotosCards(data);
			var m_1 = data.name + ":";
			var m_2 = "Address:\n" + data.location.address1 + ", " + data.location.city + ", " + data.location.state + " " + data.location.zip_code;
			var businessCard = yelp.createBusinessCard(data);
			var message = fb.createTextMessage(senderID, m_1);
			fb.sendMessageToFacebook(message);
			var message2 = fb.createTextMessage(senderID, m_2);
			fb.sendMessageToFacebook(message2);
			var message3 = fb.createCards(senderID, photo_cards);
			fb.sendMessageToFacebook(message3);
			var message4 = fb.createCards(senderID, businessCard);
			console.log("Response Status -> " + fb.sendMessageToFacebook(message4));
		}).catch(function(error) {
			console.log("error in getting restaurant info");
		});
	}
	else {
		console.log("Postback was : " + payload_params[0]);
	}
}

app.post('/intent_test', function(req, res) {
	var data = req.body;
	console.log(data);
	var fbid = data.fbid;
	console.log(fbid + "<---- this is fbid");
	var message = data.message;
	console.log(message + " <- this is the message");
	var text = sendToRecast(fbid, message);
	console.log("this is the recast json " + text);
	sendToRecast(fbid, message).then(function(message) {
		res.send(message);
	}).catch(function(error) {
		res.send(error);
		console.log(error);
	});
});

function sendToRecast(sender, mess) {
	return new Promise(function(resolve, reject) {
		var custom_url = urls.get_user_info_url + "/" + sender + "?access_token=" + config.token;
		var user_details;
		var message;

		request(custom_url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				user_details = JSON.parse(body);
			}
			else {
				console.error("Failed calling get API", response.statusCode, response.statusMessage, body.error);
			}
		});
		console.log(custom_url);
		client.textRequest(mess).then((res) => {
			var message_to_send = '';
			if (res.intent() != null) {
				var intent = res.intent().slug;
				console.log("Intent is " + intent);
	      	switch(intent) {
					// case 'greetings':
					case 'goodbyes':
						console.log("Intent: greeting");
						message = fb.createTextMessage(sender, greetings.getGreetings(user_details.first_name));
						console.log("Response status -> " + fb.sendMessageToFacebook(message));
						break;

					//case 'goodbyes':
					case 'greetings':
						console.log("Intent: goodbyes");
						message = fb.createTextMessage(sender, goodbyes.getGoodbyes(user_details.first_name));
						console.log("Response status -> " + fb.sendMessageToFacebook(message));
						break;

					//case 'help':
					case 'feedback':
						console.log("Intent: help");
						message = fb.createTextMessage(sender, help.getHelp(user_details.first_name));
						console.log("Response status -> " + fb.sendMessageToFacebook(message));
						break;

			        //case 'feedback':
			        case 'help':
			            console.log("Intent: feedback");

			            var Feedback = require('./db/feedback');
			            var newFeedback = Feedback({
			              advice: message,
			              user_id: sender.id,
			              user_firstName: user_details.first_name
			            });
			            //saving user object
			            newFeedback.save(function(err) {
			              if (err) throw err;
			              console.log('Feedback saved!');
			            });

			            message = fb.createTextMessage(sender,feedback.getFeedback(user_details.first_name));
			            console.log("Response status -> " + fb.sendMessageToFacebook(message));
			            break;


					//case 'recommend-cuisine':
					case 'search_nearby_restaurants':
						console.log("Intent: recommendCuisine");
						message = fb.createTextMessage(sender, recCuisine.getRecCuisine(user_details.first_name));
						console.log("Response status -> " + fb.sendMessageToFacebook(message));
						break;

	        		//case 'search_nearby_restaurants':
	        		case 'recommend-cuisine':
						console.log("\n Yelp search intent found:");
						console.log("Location : " + res.entities[0]['raw']);

						if (res.entities == null && res.entities[0]['raw'] != "me") {

				
							yelp.restaurantSearch_location(sender, res.entities[0]['raw']).then(function(elements) {
								console.log("Promise was resolved and we got elements");
								message = fb.createCards(sender, elements);
								console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								console.log("Got an error in yelp and got error");
							});
						}
						else {
							console.log("user found without location");
							User.findOne({ user_id: sender }, function(err, user) {
								if (err) {
									console.log(err);
								}
								else {
										console.log("user has no location or lat and lon");
										message = fb.createTextMessage(sender, "Please send your location using facebooks location sending service");
										console.log("Response status -> " + fb.sendMessageToFacebook(message));
										user.request_type = "search_nearby_restaurants";
										user.save(function(error, result) {
											if (error){
												console.log(error);
											}
										});
										console.log(user.latitude + " <- lat lon -> " + user.longitude);
								}
							});
						}
						break;

					//case 'reviews-restaurants':
					case 'price_restaurants':
						console.log("\n Yelp review intent found:");
						if (res.entities[0]['raw'] != null) {
							yelp.restaurantSearch_autocomplete(sender, res.entities[0]['raw'], "40.422760","-86.911626").then(function(id) {
								console.log("The id we got was " + id);
								yelp.restaurantSearch_reviews(sender, id).then(function(elements) {
									var message = fb.createCards(sender, elements);
									console.log("Response status -> " + fb.sendMessageToFacebook(message));

								}).catch( function(error){

									console.log("error with search reviews");
									console.log(error);

								});
							}).catch(function(error) {
								console.log("Got an error in yelp");
							});
						}
						else {
							console.log("user found without location");
							User.findOne({ user_id: sender }, function(err, user) {
								if (err) {
									console.log(err);
								}
								else {
										console.log("user has no location or lat and lon");
										message = fb.createTextMessage(sender, "Please send your location using facebooks location sending service");
										console.log("Response status -> " + fb.sendMessageToFacebook(message));
										user.request_type = "reviews-restaurants";
										user.save(function(error, result) {
											if (error){
												console.log(error);
											}
										});
										console.log(user.latitude + " <- lat lon -> " + user.longitude);
								}
							});
						}
						break;

					//case 'price_restaurants':
					case 'reviews-restaurants':
						console.log("\n Yelp price intent found");
						console.log(res);
						if (res.entities != null) {
							var range = yelp.createPriceReply();
							message = fb.createQuickReply(sender, range);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							var location = res.entities[0]['raw'];
							User.findOne({ user_id: sender }, function(err, user) {
								if (err) {
									console.log(err);
								}
								else {
									user.location = location;
									user.save(function(err, res) {
										if (err) {
											console.log(err);
										}
									});
								}
							});
						}
						else {
							var range = yelp.createPriceReply();
							message = fb.createQuickReply(sender, range);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
						}
						break;

					//case 'cuisine-restaurants':
					case 'listing-search':
						console.log("\n Yelp cuisine intent found");
						console.log(res);
						if (res.entities[0]['raw'] != null && res.entities[1]['raw'] != null) {
							yelp.restaurantSearch_categories(sender, res.entities[1]['raw'], res.entities[0]['raw']).then(function(elements) {
									message = fb.createCards(sender, elements);
									console.log("Response status -> " + fb.sendMessageToFacebook(message));

								}).catch( function(error){

									console.log("error with cuisine-restaurants");
									console.log(error);

								});
						}
						else {
							yelp.restaurantSearch_categories(sender, "West Lafayette", "thai").then(function(elements) {
								//no error
								message = fb.createCards(sender, elements);
								console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								//error
							})
						}
						break;

					//case 'listing-search':
					case 'cuisine-restaurants':
						console.log("\n airbnb listing intent found:");

						console.log(res);
						console.log("\ndone res\n");

						if (res.entities != null && res.entities[0]['raw'] != 'me') {
							console.log(res.entities[0]['raw'] );
							airbnb.listingSearch_location(sender, res.entities[0]['raw']).then(function(elements) {
							message = fb.createCards(sender, elements);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								console.log(error);
								console.log("Got an error in airbnb and got error");
							});
						}
						else {
							User.findOne({user_id: sender}, function(error, user) {
								if (error) {
									console.log(error);
								}
								else {
									message = fb.createTextMessage(sender, "Please send your location using facebooks location sending service");
									console.log("Response status -> " + fb.sendMessageToFacebook(message));
									user.request_type = "listing-search";
									user.save(function(err, res) {
										if (err) {
											console.log(err);
										}
									});
								}
							});
						}
						break;

					//case 'date-search':
					case 'date-location-search':
						console.log("\n airbnb date intent found:");

						console.log(res);
						console.log("\ndone res\n");

						if (res.entities[0]['raw'] != null && res.entities[2]['raw'] != null) {
							console.log(res.entities[0]['raw'] );
							console.log(res.entities[2]['raw'] );
							User.findOne({user_id: sender}, function(error, user) {
								if (error) {
									console.log(error);
								}
								else {
									message = fb.createTextMessage(sender, "Please send your location using facebooks location sending service");
									console.log("Response status -> " + fb.sendMessageToFacebook(message));
									user.request_type = "listing-search";
									user.save(function(err, res) {
										if (err) {
											console.log(err);
										}
									});
								}
							});
						}
						else {
							message = fb.createTextMessage(sender, "incorrect input");
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
						}
						break;

					//case 'date-location-search':
					default:
						console.log("\n airbnb date and location intent found:");

						console.log(res);
						console.log("\ndone res\n");

						if (res.entities[0]['raw'] != null && res.entities[1]['raw'] != null && res.entities[3]['raw'] != null) {
							console.log(res.entities[0]['raw'] );
							console.log(res.entities[1]['raw'] );
							console.log(res.entities[3]['raw'] );
							airbnb.listingSearch_date_location(sender,res.entities[0]['raw'], res.entities[1]['raw'], res.entities[3]['raw']).then(function(elements) {
							message = fb.createCards(sender, elements);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								console.log(error);
								console.log("Got an error in airbnb and got error");
							});
						}
						else {
							message = fb.createTextMessage(sender, "incorrect input");
							console.log("Response status -> " + fb.sendMessageToFacebook(message));

						}
						break;

					//case 'host-search':
					case 'rating-search':
						console.log("\n airbnb host intent found:");
						console.log(res);
						console.log("\ndone res\n");

						if (res.entities[0]['raw'] != null) {
							console.log(res.entities[0]['raw'] );
							airbnb.listingSearch_host(sender, res.entities[0]['raw']).then(function(elements) {
							message = fb.createCards(sender, elements);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								console.log(error);
								console.log("Got an error in airbnb and got error");
							});
						}
						else {
							message = fb.createTextMessage(sender, "incorrect input");
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
						}
						break;

					//case 'rating-search':
					case 'host-search':
						console.log("\n airbnb host intent found:");

						console.log(res.entities[0]['raw']);
						console.log("\ndone res\n");

						if (res.entities[0]['raw'] != null) {
							console.log(res.entities[0]['raw'] );
							airbnb.listingSearch_rating(sender, res.entities[0]['raw']).then(function(elements) {
							message = fb.createCards(sender, elements);
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
							}).catch(function(error) {
								console.log(error);
								console.log("Got an error in airbnb and got error");
							});
						}
						else {
							message = fb.createTextMessage(sender, "incorrect input");
							console.log("Response status -> " + fb.sendMessageToFacebook(message));
						}
						break;

					//default:
					case 'date-search':
						message = fb.createTextMessage(sender, "Didn't really get that " + user_details['first_name'] + ". Could you try something else?");
						console.log("Response status -> " + fb.sendMessageToFacebook(message));
				}
			}
			else {
				//message = fb.createTextMessage(sender, "Didn't really get that " + user_details['first_name'] + ". Could you try something else?");
				message = fb.createTextMessage(sender, greetings.getGreetings(user_details.first_name));
				console.log("Response status -> " + fb.sendMessageToFacebook(message));
			}
			console.log("Message is " + message);
			resolve(message);
		}).catch(e => {
			console.log(e);
			reject(e);
		});
	});
}

module.exports = app;