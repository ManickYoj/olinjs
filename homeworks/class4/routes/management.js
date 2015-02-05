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

module.exports.route = function(req, res) {
	switch(req.params.function) {
		case 'add': return create (req, res);
		case 'delete': return remove (req, res);
		case 'edit': return edit (req, res);
		case 'outOfStock': return outOfStock (req, res);
	}
};

// post request handlers
function create (req, res) {
	var rq = req.body;
	var failure_json = { 
		layout: false,
		alert: {
			summary: 'Add Failed.',
			description: 'Ingredient name must be composed of words with the first letter of each capitalized. ' +
						 'No special characters or numbers are allowed.'
		}
	};

	if (!rq.name|| !rq.qty || !rq.price) return res.status(500).render('partials/alert', failure_json);
	Ingredient.create({name: rq.name, quantity: rq.qty, price: rq.price}, function (err, ingredient) {
		// Failure
		if (err) return res.status(500).render('partials/alert', failure_json);

		// Success	
		res.render('partials/ingredients', {layout: false, ingredients: [ingredient]});
	});
}

function remove (req, res) {
	Ingredient.findOneAndRemove({name: req.body.name}, {}, function (err) {
		if (err) return res.sendStatus('500'); 	// Failure
		return res.sendStatus('200');			// Success
	});
}

function outOfStock (req, res) {
	Ingredient.update({name: req.body.name}, { $set: { quantity: 0 }}, function (err) {
		if (err) return res.sendStatus('500');  // Failure
		res.sendStatus(200);  // Success
	});
}

function edit (req, res) {
	Ingredient.find({name: req.query.name}, function (err, ingredient) {
		// Failure
		if (err) return res.sendStatus('500');

		// Success
		ingredient.name = req.query.newName;
		ingredient.price = req.query.newPrice;
		ingredient.quantity = req.query.quantity;
		res.send('true');
	});
}