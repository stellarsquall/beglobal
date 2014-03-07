var BeGlobal = require('node-beglobal');

//initialize the BeGlobal API
var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'fEBjo7TypzImt5dOxxWw7Q%3D%3D'
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
	for (var i = 0; i<languages.length; i++) {
		if (results.indexOf(languages[i].from.name) === -1) {
			results.push(languages[i].from.name)
		}
	}
	return results
};

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
		beglobal.translations.translate(
		  {text: 'hello', from: 'eng', to: 'fra'},
		  function(err, results) {
		    if (err) {
		      return console.log(err);
		    }
		    console.log(results);
			res.render('translate.jade', {
				title: 'BeGlobal',
				inputlanguage: results.to,
				outputlanguage: results.from,
				translation: results.translation
			})
	 	 }
		);
	}
}
