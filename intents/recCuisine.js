function random(array) {
    return array[Math.floor(Math.random() * array.length)]
}

module.exports = {
	getRecCuisine : function(sender_name) {
		var cuisineArray = ['Chinese','Thai','Indian','American', 'Pizza', 'Mexican'];
		const answers =random(cuisineArray);
		return answers;
	},
};