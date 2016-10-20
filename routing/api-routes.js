var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./connection.js');
var mysql = require('mysql');
var players;


module.exports = function(app){

//ADD ADDITONAL FIELD IN THE QUERY BASED ON POSITION
app.get('/api/:player?', function (req, res) {	
	var chosen = req.params.player;
		var queryString = 'SELECT * FROM baseball_table WHERE POS REGEXP' + "'" + chosen +"'" + ";";
		console.log(queryString);
		connection.query(queryString, function (err, res) {
			players = res;
			console.log(res);
	});
	res.send(players);
	})


app.post("/api/submit",function(req,res){
	var teamNew = req.body
	console.log(teamNew.team[0].playerID);
	console.log(teamNew.team[1].playerID);
// ERIC'S GAME LOGIC
	// Hey Eric! thanks for the help again! The console logs above this comment are how you will parse through
	//the array of objects. teamNew.team[0].playerID gets you the first player's ID in the team array and so on.
	// If you have any questions I'm just a slack away. Also I might be working on adding team data to a table and
	// I might be using this file as well. I'll just make a copy of this and edit on another file just so you can 
	// focus on this one. Happy Coding!!
})



}


