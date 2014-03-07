$(document).ready(function() {
	$('.dropdown-form').dropdown();

	$('.btn-submit').on('click', function(e){
		e.preventDefault();
		var translateFrom = $('.translate-from').val();
		var translateTo = $('.translate-to').val();
		var wordInput = $('.word-input').val();
		$.ajax( 
			{ url: "/translate",
			type: "post",
			data: {
				text: wordInput,
				from: translateFrom,
				to: translateTo
			},
			success: function(beglobaldata) {
				console.log('BeGlobal-Data Client: ', beglobaldata);
				for (var i = 0; i < beglobaldata.length; i++) {
					$('.btn-submit').append('<li>' + beglobaldata[i].name + '</li>');
				};
			}
		});
	})
})