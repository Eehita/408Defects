//airbnb create all functionality here
const request = require('request-promise');
const config = require('../config');
const urls = require('../urls');
const fb = require('./facebook-service');
const cheerio = require('cheerio');

module.exports = {
		
	listingSearch_location : function(sender, location) {

		return new Promise(function(resolve, reject) {
			console.log("in listingSearch_location\n");	
			console.log('POST Request');	
			var elements = [];
			request({
				method: 'POST',
				url : 'https://www.airbnb.com/api/v1/authorize',
				DEFAULT_REQUEST_CONFIGS : {
      				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
     				}
    			},
    			json: true,
			    body: {
			        username: 'eehitafun96@gmail.com',
			        password: 'aideraTest',
			        grant_type: 'password',
			        key:'d306zoyjsyarp7ifhu67rjxn52tv0t20'
			    }
			}).then(function(response) {
				var data = response.access_token;
				console.log('access_token: ' + data);
				//var url = 'https://www.airbnb.com/search/search_results?location=' + location;
				var url = 'https://www.airbnb.com/search/search_results?';
				console.log('url: ' + url);
					console.log('GET Request');
					request({
						method: 'GET',
						url : url,
						json: true,
						DEFAULT_REQUEST_CONFIGS : {
		      				headers: {
		        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		     				}
		    			}
					}).then(function(response){
						elements = module.exports.createListingCards(sender, response);
						//console.log(JSON.stringify(elements));
						resolve(elements);
					
					});
			}).catch(function(error) {
				console.log('Some error: ' +  error);
				reject(error);
			});
		});

	},
	listingSearch_lat_long : function(sender, lat, long) {

		return new Promise(function(resolve, reject) {
			console.log("in listingSearch_lat long\n");	
			console.log('POST Request');	
			var elements = [];
			request({
				method: 'POST',
				url : 'https://www.airbnb.com/api/v1/authorize',
				DEFAULT_REQUEST_CONFIGS : {
      				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
     				}
    			},
    			json: true,
			    body: {
			        username: 'eehitafun96@gmail.com',
			        password: 'aideraTest',
			        grant_type: 'password',
			        key:'d306zoyjsyarp7ifhu67rjxn52tv0t20'
			    }
			}).then(function(response) {
				var data = response.access_token;
				console.log('access_token: ' + data);
				//var url = 'https://www.airbnb.com/search/search_results?lat=' + lat + '&lng=' + long;
				var url = 'https://www.airbnb.com/search/search_results?lat=' + lat;
				console.log('url: ' + url);
					console.log('GET Request');
					request({
						method: 'GET',
						url : url,
						json: true,
						DEFAULT_REQUEST_CONFIGS : {
		      				headers: {
		        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		     				}
		    			}
					}).then(function(response){
						elements = module.exports.createListingCards(sender, response);
						//console.log(JSON.stringify(elements));
						resolve(elements);
					
					});
			}).catch(function(error) {
				console.log('Some error: ' +  error);
				reject(error);
			});
		});

	},

	listingSearch_date : function(sender, checkin, checkout) {

		return new Promise(function(resolve, reject) {
			console.log("in listingSearch_location\n");	
			console.log('POST Request');	
			var elements = [];
			request({
				method: 'POST',
				url : 'https://www.airbnb.com/api/v1/authorize',
				DEFAULT_REQUEST_CONFIGS : {
      				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
     				}
    			},
    			json: true,
			    body: {
			        username: 'eehitafun96@gmail.com',
			        password: 'aideraTest',
			        grant_type: 'password',
			        key:'d306zoyjsyarp7ifhu67rjxn52tv0t20'
			    }
			}).then(function(response) {
				var data = response.access_token;
				console.log('access_token: ' + data);
				//var url = 'https://www.airbnb.com/search/search_results?checkin=' + checkin + '&checkout=' + checkout;
				var url = 'https://www.airbnb.com/search/search_results?';
				console.log('url: ' + url);
					console.log('GET Request');
					request({
						method: 'GET',
						url : url,
						json: true,
						DEFAULT_REQUEST_CONFIGS : {
		      				headers: {
		        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		     				}
		    			}
					}).then(function(response){
						elements = module.exports.createDatesCards(response, checkin, checkout);
						console.log(JSON.stringify(elements));
						resolve(elements);
					
					});
			}).catch(function(error) {
				console.log('Some error: ' +  error);
				reject(error);
			});
		});

	},
	listingSearch_date_location : function(sender, checkin, checkout, location) {

		return new Promise(function(resolve, reject) {
			console.log("in listingSearch_location\n");	
			console.log('POST Request');	
			var elements = [];
			request({
				method: 'POST',
				url : 'https://www.airbnb.com/api/v1/authorize',
				DEFAULT_REQUEST_CONFIGS : {
      				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
     				}
    			},
    			json: true,
			    body: {
			        username: 'eehitafun96@gmail.com',
			        password: 'aideraTest',
			        grant_type: 'password',
			        key:'d306zoyjsyarp7ifhu67rjxn52tv0t20'
			    }
			}).then(function(response) {
				var data = response.access_token;
				console.log('access_token: ' + data);
				//var url = 'https://www.airbnb.com/search/search_results?location=' + location + '&checkin=' + checkin + '&checkout=' + checkout;
				 var url = 'https://www.airbnb.com/search/search_results?checkin=' + checkin + '&checkout=' + checkout;
				console.log('url: ' + url);
					console.log('GET Request');
					request({
						method: 'GET',
						url : url,
						json: true,
						DEFAULT_REQUEST_CONFIGS : {
		      				headers: {
		        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		     				}
		    			}
					}).then(function(response){
						elements = module.exports.createDatesCards(response, checkin, checkout);
						console.log(JSON.stringify(elements));
						resolve(elements);
					
					});
			}).catch(function(error) {
				console.log('Some error: ' +  error);
				reject(error);
			});
		});

	},

	listingSearch_rating : function(sender, rating) {

		return new Promise(function(resolve, reject) {
			console.log("in listingSearch_rating\n");	
			console.log('POST Request');	
			var elements = [];
			request({
				method: 'POST',
				url : 'https://www.airbnb.com/api/v1/authorize',
				DEFAULT_REQUEST_CONFIGS : {
      				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
     				}
    			},
    			json: true,
			    body: {
			        username: 'eehitafun96@gmail.com',
			        password: 'aideraTest',
			        grant_type: 'password',
			        key:'d306zoyjsyarp7ifhu67rjxn52tv0t20'
			    }
			}).then(function(response) {
				var data = response.access_token;
				console.log('access_token: ' + data);
				var url = 'https://www.airbnb.com/search/search_results?star_rating=' + rating;
				console.log('url: ' + url);
					console.log('GET Request');
					request({
						method: 'GET',
						url : url,
						json: true,
						DEFAULT_REQUEST_CONFIGS : {
		      				headers: {
		        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		     				}
		    			}
					}).then(function(response){
						elements = module.exports.createRatingCards(response);
						console.log(JSON.stringify(elements));
						resolve(elements);
					
					});
			}).catch(function(error) {
				console.log('Some error: ' +  error);
				reject(error);
			});
		});

	},
	listing_review : function(sender, url) {

		return new Promise(function(resolve, reject) {
			console.log("in listing_review\n");	
			console.log('POST Request');	
			var elements = [];
			request({
				method: 'POST',
				url : 'https://www.airbnb.com/api/v1/authorize',
				DEFAULT_REQUEST_CONFIGS : {
      				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
     				}
    			},
    			json: true,
			    body: {
			        username: 'eehitafun96@gmail.com',
			        password: 'aideraTest',
			        grant_type: 'password',
			        key:'d306zoyjsyarp7ifhu67rjxn52tv0t20'
			    }
			}).then(function(response) {
				var data = response.access_token;
				console.log('access_token: ' + data);
				var url = 'www.airbnb.com/users/review_page/' + hostid + '?';
				console.log('url: ' + url);
					console.log('GET Request');
					request({
						method: 'GET',
						url : url,
						json: true,
						DEFAULT_REQUEST_CONFIGS : {
		      				headers: {
		        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		     				},
		     			},
		     			body : {
		     				key: "d306zoyjsyarp7ifhu67rjxn52tv0t20",
      						page: 1,
      						role: 'host'
    						
		    			}
					}).then(function(response){
						console.log(response);
						var data1 = JSON.parse(response);

						if (data.success) {
				          try {
				            // Since the res is in HTML, parse with cheerio
				            $ = cheerio.load(JSON.parse(body).review_content);
				            // Construct list of textual reviews
				            $('.comment-container .expandable-content p').each(function(idx, $review) {
				              elements.push($elements.children[0].data);
				            });

            				resolve(reviews);
				         
				    

						//elements = module.exports.createRatingCards(response);
						//console.log(JSON.stringify(elements));
									//resolve(elements);
				          } catch (err) {
				            reject(err);
				          }
				        }
					
					});
			}).catch(function(error) {
				console.log('Some error: ' +  error);
				reject(error);
			});
		});

	},

	createListingCards : function(sender, data) {
		var elements = [];
		var businessArray = data.results_json.search_results.slice(0,10);
		console.log('Business names: ');
		console.log( businessArray);
		businessArray.forEach(function(business) {
			console.log(business.listing.name);
			var temp_element = {
				title : business.listing.name,
				image_url : business.listing.picture_url,
				subtitle : business.listing.public_address,
				buttons: [
				{
					type : "web_url",
					title : "Get more info",
					url : 'https://www.airbnb.com/rooms/' + business.listing.id
				},
				{
					type : "postback",
					title : "Listings from Host",
					payload : 'get_host ' + business.listing.primary_host.id + ' ' + sender
				}
				]			
			};
			elements.push(temp_element);
		});
		return elements;

	},

	createRatingCards : function(data) {
		var elements = [];
		var businessArray = data.results_json.search_results.slice(0,10);
		console.log('Business names: ');
		businessArray.forEach(function(business) {
			console.log(business.listing.name);
			var temp_element = {
				title : business.listing.name,
				image_url : business.listing.picture_url,
				//subtitle : business.listing.star_rating,
				buttons: [
				{
					type : "web_url",
					title : "Get more info",
					url : 'https://www.airbnb.com/rooms/' + business.listing.id
				}
				]			
			};
			elements.push(temp_element);
		});
		return elements;

	},

	createDatesCards : function(data, checkin, checkout) {
		var elements = [];
		var businessArray = data.results_json.search_results.slice(0,10);
		console.log('Business names: ');
		businessArray.forEach(function(business) {
			console.log(business.listing.name);
			var temp_element = {
				title : business.listing.name,
				image_url : business.listing.picture_url,
				subtitle : checkin + ' - ' + checkout,
				
				buttons: [{
					type : "web_url",
					title : "Get more info",
					url : 'https://www.airbnb.com/rooms/' + business.listing.id
				}
				]			
			};
			elements.push(temp_element);
		});
		return elements;

	},

	listingSearch_host : function(sender, hostId) {

		return new Promise(function(resolve, reject) {
			console.log("in listingSearch_host\n");	
			console.log('POST Request');	
			var elements = [];
			request({
				method: 'POST',
				url : 'https://www.airbnb.com/api/v1/authorize',
				DEFAULT_REQUEST_CONFIGS : {
      				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
     				}
    			},
    			json: true,
			    body: {
			        username: 'eehitafun96@gmail.com',
			        password: 'aideraTest',
			        grant_type: 'password',
			        key:'d306zoyjsyarp7ifhu67rjxn52tv0t20'
			    }
			}).then(function(response) {
				var data = response.access_token;
				console.log('access_token: ' + data);
				//var url = 'https://www.airbnb.com/api/v2/listings?client_id=' +  sender + '&user_id=' + hostId;
				var url = 'https://api.airbnb.com/v2/listings?client_id=' +  '3092nxybyb0otqw18e8nh5nty' + '&user_id=' + hostId;
				console.log('url: ' + url);
					console.log('GET Request');
					request({
						method: 'GET',
						url : url,
						json: true,
						DEFAULT_REQUEST_CONFIGS : {
		      				headers: {
		        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		     				}
		    			}
					}).then(function(response){
						elements = module.exports.createHostCards(response, hostId);
						console.log(JSON.stringify(elements));
						resolve(elements);
					
					});
			}).catch(function(error) {
				console.log('Some error: ' +  error);
				reject(error);
			});
		});

	},

	createHostCards : function(data, hostId) {
		var elements = [];
		var businessArray = data.listings;
		console.log('Business names: ');
		//console.log(businessArray);
		businessArray.forEach(function(business) {
			console.log(business.city);
			var temp_element = {
				title : business.name,
				image_url : business.picture_url,
				subtitle : business.address,
				buttons: [{
					type : "web_url",
					title : "Get more info",
					url : 'https://www.airbnb.com/rooms/' + business.id
				},
				{
					type : "web_url",
					title : "Get host reviews",
					url : 'https://www.airbnb.com/users/show/' + hostId +'#reviews'
				}
				]			
			};
			elements.push(temp_element);
		});
		return elements;

	},

}