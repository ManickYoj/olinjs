var ingredients = [];
var $total = $('#total');

$('.checkbox').click( function () {
	var $checkbox = $(this);

	if ($checkbox.is(':checked')) {
		ingredients.push($(this).val());
		$total.text(parseFloat($total.text()) + parseFloat($checkbox.attr('price')));
	} else {
		var index = ingredients.indexOf($checkbox.val());
		if ( ~index ) ingredients.splice(index, 1);
		$total.text(parseFloat($total.text()) - parseFloat($checkbox.attr('price')));
	}
});

$('form').submit( function(event) {
	event.preventDefault();
	console.log(ingredients);
	$.post('order', {
		ingredients: ingredients
	}).done( function (data, status) {
		$('div#alert-box').html(data);
	});
});