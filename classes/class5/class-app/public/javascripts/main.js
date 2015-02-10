$('#button').click(function(e) {
	e.preventDefault();
	$.post('/', {
		data: "hi"
	}).done(function (data){
		alert(data);
	});
});