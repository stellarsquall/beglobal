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
			success: function(results) {
				console.log('BeGlobal-Data Client: ', results);
					$('.btn-submit').append('<li>' + results.translation + '</li>');
				}
			}
		)}
	)}
)