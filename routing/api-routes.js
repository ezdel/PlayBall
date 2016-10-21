var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./connection.js');
var mysql = require('mysql');
var players;


module.exports = function(app){

//ADD ADDITONAL FIELD IN THE QUERY BASED ON POSITION
app.get('/api-nonPitch/:player?/:positionType?', function (req, res) {	
	 var chosen = req.params.player;
	 var chosenPosition = req.params.positionType
	 console.log(chosenPosition);
	 if(chosenPosition === 'DH'){
	 	var queryString = 'SELECT * FROM fielding WHERE playerID REGEXP' + "'" + chosen +"'"+";";
		
	}else{
		var queryString = 'SELECT * FROM fielding WHERE playerID REGEXP' + "'" + chosen +"'" +"AND POS = "+"'"+chosenPosition+"'"+";";

	}
		connection.query(queryString, function (err, res) {
			players = res;
			console.log(res);
	});
	res.send(players);
	})

// This works when querying from another table
app.get('/api-Pitch/:player?/:positionType?', function (req, res) {	
	 var chosen = req.params.player;
	 var chosenPosition = req.params.positionType
		var queryString = 'SELECT * FROM baseball_table WHERE nameLast REGEXP' + "'" + chosen +"'" +"AND POS = "+"'"+chosenPosition+"'"+";";
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


