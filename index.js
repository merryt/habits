var express = require('express');
var app = express();
var fs = require('fs')
var path = require('path')
var _ = require('lodash')


// establishing firebase
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://changinghabits.firebaseio.com/");
var streakRef = myFirebaseRef.child("streak")
// establishing templating libraries
var engines = require('consolidate')
app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

// set up globals

var getDate = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	}

	if(mm<10) {
	    mm='0'+mm
	}

	today = yyyy+"-"+mm+"-"+dd;
	return today
}

var today = getDate()
var currentDay = {}

app.get('/', function (req, res) {
	currentDay[today] = true

	streakRef.limitToLast(372).on("value", function(snapshot){
		var array = []
		var data = snapshot.val()
		for (var key in data){
			array.push(data[key])
		}

		var firstRealDay = array[0].dayOfWeek
	  for (var i = 0; i < firstRealDay ; i ++){
			array.unshift(
				{
					date:"12",
					goal: "meh",
					dayOfWeek: 2-i
				}
			)
		}

		res.render('index', {dates: array})
	})
});

app.post('/todayWin', function (req, res) {
	streakRef.limitToLast(1).on("value", function(snapshot){
		var lastday = snapshot.val()
		if (lastday[364].date != today){

		}
	})
	console.log("got here")
	res.redirect('/')
});



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
