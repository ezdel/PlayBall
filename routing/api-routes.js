var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./connection.js');
var mysql = require('mysql');
var players;


module.exports = function(app){


app.get('/api/:player?', function (req, res) {	
	var chosen = req.params.player;
		var queryString = 'SELECT * FROM Master WHERE nameLast REGEXP' + "'" + chosen +"'" + ";";
	console.log(queryString);
		connection.query(queryString, function (err, res) {
			players = res;
	});
	console.log(players);
	res.send(players);
	})
}


