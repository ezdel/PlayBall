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
		connection.query(queryString, function (err, res) {
			players = res;
	});
	res.send(players);
	})


app.post("/api/submit",function(req,res){
	var teamNew = req.body
	console.log(teamNew.player.playerID);
	//console.log(teamNew.team[1].player.playerID);
// ERIC'S GAME LOGIC
})



}


