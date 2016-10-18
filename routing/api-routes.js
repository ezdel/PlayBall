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
	console.log(teamNew)
	console.log(teamNew.team[0].player.playerID);
	// console.log(teamNew.team[1].player.playerID);
	// // console.log(teamNew.team[2].player.playerID);
	// // console.log(teamNew.team[3].player.playerID);
	// // console.log(teamNew.team[4].player.playerID);
	// // console.log(teamNew.team[5].player.playerID);
	// // console.log(teamNew.team[6].player.playerID);
	// // console.log(teamNew.team[7].player.playerID);
	// // console.log(teamNew.team[8].player.playerID);
	// // console.log(teamNew.team[09].player.playerID);
// ERIC'S GAME LOGIC
})



}


