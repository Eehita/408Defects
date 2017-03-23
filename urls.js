const urls = {
	post_message_url : 'https://graph.facebook.com/v2.8/me/messages/',
	get_user_info_url : 'https://graph.facebook.com/v2.8/',
	//get_user_info_url : 'http://localhost:3100/v2.6', // uncomment for testing
	yelp_base_search : 'https://api.yelp.com/v3/businesses/search',
	yelp_reviews : 'https://api.yelp.com/v3/businesses/',
	yelp_autocomplete : 'https://api.yelp.com/v3/autocomplete',
	airbnb_base_search : 'https://api.airbnb.com/v2/search_results?',
	airbnb_listing_search: 'https://api.airbnb.com/v2/listings?',
}

module.exports = urls;
