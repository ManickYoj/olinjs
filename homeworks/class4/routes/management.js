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

module.exports.post = function(req, res) {
	if (req.body.action === 'add') return create (req, res);
	else if (req.body.action === 'delete') return remove (req, res);
	else if (req.body.action === 'oos') return outOfStock (req, res);
	else if (req.body.action === 'edit') return edit (req, res);
};

// post request handlers
function create (req, res) {
	var rq = req.body;
	Ingredient.create({name: rq.name, quantity: rq.qty, price: rq.price}, function (err, ingredient) {
		// Failure
		if (err) return res.sendStatus('500');

		// Success	
		res.render('partials/ingredient', {layout: false, ingredients: [ingredient]});
	});
}

function remove (req, res) {
	
	Ingredient.find().exec(function(err, ingredient){
		console.log(ingredient);
	});
	console.log(req.body.name);
	Ingredient.findOneAndRemove({name: req.body.name}, {}, function (err, ingredient) {
		if (err || ingredient.name === null) return res.sendStatus('500'); 	// Failure
		console.log(ingredient.name);
		return res.sendStatus('200');			// Success
	});
}

function outOfStock (req, res) {
	Ingredient.find({name: req.query.name}, function (err, ingredient) {
		// Failure
		if (err) return res.sendStatus('500');

		// Success
		ingredient.quantity = 0;
		res.send('true');
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