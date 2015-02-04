var Ingredient = require('../model/ingredients');

// page request handler
module.exports = function (req, res) {
	var pageData = {
		page_title: 'Manage',
		incl_js: ['management-fe']
	};

	Ingredient.find()
		.sort('name')
		.exec(function(err, ingredients) {
			// Failure
			if (err) return res.sendStatus('500');

			// Success
			pageData.ingredients = ingredients;
			res.render('management', pageData);
	});	
};

// post request handlers
module.exports.add = function (req, res) {
	Ingredient.create(req.body, function (err, ingredient) {
		// Failure
		if (err) return res.sendStatus('500');

		// Success	
		res.render('partials/ingredient', {layout: false, ingredients: [ingredient]});
	});
};

module.exports.remove = function (req, res) {
	Ingredient.findOneAndRemove({name: req.query.name}, {}, function (err, ingredient) {
		// Failure
		if (err) {
			res.send('false');
			return console.error("Failed to find and remove ingredient by name: " + ingredient, err);
		}
		// Success
		res.send('true');
	});
};

module.exports.outOfStock = function (req, res) {
	Ingredient.find({name: req.query.name}, function (err, ingredient) {
		// Failure
		if (err) {
			res.send('false');
			return console.error("Failed to find ingredient by name: " + ingredient, err);
		}
		// Success
		ingredient.quantity = 0;
		res.send('true');
	});
};

module.exports.edit = function (req, res) {
	Ingredient.find({name: req.query.name}, function (err, ingredient) {
		// Failure
		if (err) {
			res.send('false');
			return console.error("Failed to find ingredient by name: " + ingredient, err);
		}
		// Success
		ingredient.name = req.query.newName;
		ingredient.price = req.query.newPrice;
		ingredient.quantity = req.query.quantity;
		res.send('true');
	});
};