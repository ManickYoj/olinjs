var $add = $("#add-new");

var onSuccess = function(data, status) {
	console.log('response: ' + data);
	$( data ).prependTo( 'tbody' );
};

var onError = function(data, status) {
	console.log("An error has occurred, status code " + status);
};

$add.submit(function (event) {
	console.log('pressed');
	event.preventDefault();
	var qty = $add.find("[name='qty']").val();
	var price = $add.find("[name='price']").val();
	var name = $add.find("[name='name']").val();

	$.post("ingredients", {
		qty: qty,
		price: price,
		name: name
	}).done(onSuccess).error(onError)
});
