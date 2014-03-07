var BeGlobal = require('node-beglobal');

//initialize the BeGlobal API
var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'cJgoWyKRD2ctrn0QULJqFg%3D%3D'
});

// callback that gets all languages from BeGlobal.
// this function is called inside of module.exports.index,
// and calls the argument it recieves, langCallback, as a callback.
// finally, langCallback renders the view once all the massaged data
// has been recieved from BeGlobal

var getLanguages = function(callback) {
	beglobal.languages.all(
		function(err, results) {
			if (err) {
				return console.log(err);
			}
			callback(results)
		}
	)
};

var getUniqueLanguages = function(languages) {
	var results = [];
	var resultsObject = [];
	for (var i = 0; i<languages.length; i++) {
		if (results.indexOf(languages[i].from.name) === -1) {
			results.push(languages[i].from.name);
			resultsObject.push(languages[i].from)
		}
	}
	return resultsObject
};

var translateFunction = function(callback, data) {
	beglobal.translations.translate(
	 	data,
	  	function(err, results) {
	    	if (err) {
	      	return console.log(err);
	    	}
	    	callback(results)
		}
	)
};

// JQuery

// $(document).ready(function() {
// 	var wordInput = $('.word-input').text();
// });	

module.exports = {
	index: function(req, res) {
		var langCallback = function(results) {
			console.log(results);
	    	res.render('translate.jade', {
	    		title: 'BeGlobal',
	    		languages: getUniqueLanguages(results)
	    	});
		};
		getLanguages(langCallback);
	},

	translate: function(req, res) {
		var translateCallback = function(results) {
			res.send(results);
		};
			translateFunction(translateCallback, req.body);
	}
}
