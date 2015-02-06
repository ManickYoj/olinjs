var Ingredient = require('../model/ingredients');
var Order = require('../model/orders');
var Burger = require('../model/burger');

module.exports = function (req, res) {
	var pageData = {
		page_title: 'Order',
		incl_js: ['customer-fe']
	};

	Ingredient.find().sort({name: 1}).exec(function (err, ingredients) {
		if (err) res.sendStatus(500);
		pageData.ingredient = ingredients;
		res.render('customer', pageData);
	});
};

module.exports.order = function (req, res) {
	var rq = req.body;
	Burger.create({ingredients: [rq.ingredients]}, function (err, burger) {
		if (err) res.sendStatus(500);

		Order.create({customerName: rq.customerName, items: [burger]}, function (err, order) {
			if (err) res.sendStatus(500);
			res.render('partials/alert', { 
				layout: false,
				alert: {
					type: 'success',
					summary: 'Congratulations.',
					description: 'Your click has caused the creation of delicious burgers, en route to your mouth.'
				}
			});
		});
	});
};

