/*Required modules for Yelp*/
const request = require('request-promise');
const config = require('../config');
const urls = require('../urls');
const fb = require('./facebook-service');

module.exports = {
	//define all yelp functionality here
	restaurantSearch_lat_lon : function(sender, lat, lon) {

		return new Promise(function(resolve, reject) {

			//var url = urls.yelp_base_search + '?latitude=' + lat + '&longitude=' + lon;
			var url = urls.yelp_base_search + '?latitude=' + lat;
			console.log("\n\n\n\n\n REACHED HERE")
			request({
				method: 'GET',
				url : url,
				headers: {
					'Authorization' : config.yelp_token,
				}
			}).then(function(response) {
				var data = JSON.parse(response);
				var elements = module.exports.createRestaurantCards(data);
				resolve(elements);
			}).catch(function(error) {
				console.log("Got to error");
				reject(error);
			});
		});

	},

	restaurantSearch_location : function(sender, location) {

		return new Promise(function(resolve, reject) {

			//var url = urls.yelp_base_search + '?term=food&location=' + location;			
			var url = urls.yelp_base_search + '?location=' + location;
			request({
				method: 'GET',
				url: url,
				headers: {
					'Authorization': config.yelp_token,
				}
			}).then(function(response) {
				var data = JSON.parse(response);
				var elements = module.exports.createRestaurantCards(data);
				resolve(elements);
			}).catch(function(UNAVAILABLE_FOR_LOCATION) {
				var message = fb.createTextMessage(sender, "Service is unavalible in that area.");
				console.log("Response status -> " + fb.sendMessageToFacebook(message));
				//console.log("Error");
				//var data = JSON.parse(error);
				//reject(data);
			}); 
		});
	},

	createRestaurantCards : function(data) {

		var elements = [];
		var businessArray = data.businesses.slice(0,10);
		businessArray.forEach(function(business) {
			var temp_element = {
				title : business.name,
				subtitle : business.categories[0].title + "\n" + business.rating + " stars",
				image_url : business.image_url,
				buttons: [{
					type : "postback",
					title : "Get more info",
					payload : "get_info " + business.id,
				}, {
					type : "web_url",
					url : business.url,
					title : "Go to Yelp Listing",
				}, {
					type : "postback",
					title : "Get Reviews!",
					payload : "get_reviews " + business.id,
				}]
			};

			elements.push(temp_element);
		});

		return elements;

	},

	restaurantSearch_autocomplete : function(sender, text, lat, lon) {

		return new Promise(function(resolve, reject) {
			var url = urls.yelp_autocomplete + '?text=' + text + '&latitude=' + lat + '&longitude=' + lon;
			request({
				method: 'GET',
				url: url,
				headers: {
					'Authorization': config.yelp_token,
				}
			}).then(function(response) {
				var data = JSON.parse(response);
				var id = data.businesses[0].id;
				resolve(id);
			}).catch(function(error) {
				console.log(error);
				reject(error);
			}); 
		});
	},

	sendRestaurantInfo : function(sender, businessID) {

		return new Promise(function(resolve, reject) {
			
			var url = urls.yelp_reviews + businessID;

			request({
				method : 'GET',
				url : url,
				headers: {
					'Authorization' : config.yelp_token,
				}
			}).then (function(response) {
				var data = JSON.parse(response);
				resolve(data);
			}).catch (function(error) {
				reject(error);
			});
		});
	},

	restaurantSearch_reviews : function(sender, id) {

		return new Promise(function(resolve, reject) {
			var url = urls.yelp_reviews + id + '/reviews';
			request({
				method: 'GET',
				url: url,
				headers: {
					'Authorization': config.yelp_token,
				}
			}).then(function(response) {
				var data = JSON.parse(response);
				var elements = module.exports.createReviewCards(data);
				resolve(elements);

			}).catch(function(error) {
				console.log("Got to error");
				reject(error);
			}); 
		});
	},

	createReviewCards : function(data) {

		var elements = [];
		var reviewsArray = data.reviews;

		reviewsArray.forEach(function(business) {
			var temp_element = {
				title : business.user.name,
				subtitle : business.text,
				image_url : business.user.image_url,
				buttons: [{
					type : "web_url", 
					url : business.url,
					title : "See more",
				}],
			};

			elements.push(temp_element);
		});
		return elements;
	},


	createBusinessPhotosCards : function(data) {

		var counter = 1;
		var elements = [];
		var photos = data.photos;

		photos.forEach(function(photo) {
			var temp_element = {
				title : "Photo " + counter,
				image_url : photo,
			};
			elements.push(temp_element);
			counter++;
		});

		return elements;
	},

	createBusinessCard : function(data) {

		var elements = [{
			title : data.name,
			subtitle : data.categories[0].title + "\n" + data.rating + " stars",
			image_url : data.image_url,
			buttons: [{
				type : "web_url",
				url : data.url,
				title : "Open on Yelp",
			}, {
				type : "phone_number",
				title : "Call them!",
				payload : data.phone,
			}, {
				type : "element_share",
			}],
		}];

		return elements;
	},

	restaurantSearch_price : function(sender, lat, long, num) {

		return new Promise(function(resolve, reject) {
			//var url = urls.yelp_base_search + '?latitude=' + lat + '&longitude=' + long + '&price=' + num;
			var url = urls.yelp_base_search + '&longitude=' + long + '&price=' + num;

			request({
				method: 'GET',
				url: url,
				headers: {
					'Authorization': config.yelp_token,
				}
			}).then(function(response) {
				var data = JSON.parse(response);
				var elements = module.exports.createRestaurantCards(data);
				resolve(elements);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	restaurantSearch_price_location : function(sender, location, num) {

		return new Promise(function(resolve, reject) {
			//var url = urls.yelp_base_search + '?location=' + location + '&price=' + num;
			var url = urls.yelp_base_search + '&price=' + num;

			request({
				method: 'GET',
				url: url,
				headers: {
					'Authorization': config.yelp_token,
				}
			}).then(function(response) {
				var data = JSON.parse(response);
				var elements = module.exports.createRestaurantCards(data);
				resolve(elements);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	createPriceReply : function() {
		var message = {
	    	text: "What's your preferred price range?",
	      	quick_replies: [
		    	{
		          content_type:"text",
		          title:"$",
		          payload:"get_price " + "1",
		        },
		        {
		          content_type:"text",
		          title:"$$",
		          payload:"get_price " + "2",
		        },
		        {
		          content_type:"text",
		          title:"$$$",
		          payload:"get_price " + "3",
		        }]
		    };
		return message;
	},

	restaurantSearch_categories : function(sender, location, text) {

		return new Promise(function(resolve, reject) {
			//var url = urls.yelp_base_search + '?location=' + location + '&categories=' + text;
			var url = urls.yelp_base_search + '?location=' + location;

			request({
				method: 'GET',
				url: url,
				headers: {
					'Authorization': config.yelp_token,
				}
			}).then (function(response) {
				var data = JSON.parse(response);
				var elements = module.exports.createRestaurantCards(data);
				resolve(elements);
			}).catch (function(error) {
				reject(error);
			});
		});
	},

}
