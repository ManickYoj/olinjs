var $add = $("#add-form");

var onSuccess = function(data, status) {
	$( data ).prependTo('#ingredient-rows');
	$('.alert').remove();
};

var onError = function(data, status) {
	if ($('.alert').length) return;
	var alert = "" +
	"<div class='alert alert-danger alert-dismissible' role='alert>\
  	<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>\
  	<strong>Add Failed.</strong> New ingredients names must start with at least one uppercase character and have a positive price and quanitity.\
	</div>";
	$(alert).prependTo('#header-row');
};

$add.submit(function (event) {
	event.preventDefault();
	var qty = $add.find("[name='qty']").val();
	var price = $add.find("[name='price']").val();
	var name = $add.find("[name='name']").val();

	$.post("ingredients", {
		qty: qty,
		price: price,
		name: name
	}).done(onSuccess).error(onError);
});
