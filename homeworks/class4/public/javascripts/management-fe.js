 
// Put the name of the clicked button into the hidden action element
var $action = $("#action");
$(":submit").click(function () { $action.val(this.value); });


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

$("#add-form").submit(function (event) {
	event.preventDefault();
	var $form = $(this);

	$.post("ingredients", {
		action: $action.val(),
		qty: $form.find("[name='qty']").val(),
		price: $form.find("[name='price']").val(),
		name: $form.find("[name='name']").val()
	}).done(onSuccess).error(onError);
});

$(".ingredient-row").submit(function(event) {
	event.preventDefault();
	var $form = $(this);

	$.post('ingredients', {
		action: $action.val(),
		name: $form.find(".name").html()
	}).done( function (data, status) {
		$form.remove();
	}).error (function (data, status) {
		console.log("Remove failed.")
	})
})