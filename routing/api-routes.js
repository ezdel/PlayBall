var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./connection.js');
var mysql = require('mysql');
var Player = require("../player.js");
var players;

console.log(Player);



module.exports = function(app){

//ADD ADDITONAL FIELD IN THE QUERY BASED ON POSITION
app.get('/api-nonPitch/:player?/:positionType?', function (req, res) {	
	 var chosen = req.params.player;
	 var chosenPosition = req.params.positionType
	 console.log(chosenPosition);
	 if(chosenPosition === 'DH'){
	 	var queryString = 'SELECT * FROM playball_batting WHERE nameLast REGEXP' + "'" + chosen +"'" +"AND POS = 'OF';";
		
	}else{
		var queryString = 'SELECT * FROM playball_batting WHERE nameLast REGEXP' + "'" + chosen +"'" +"AND POS = "+"'"+chosenPosition+"'"+";";


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
		var queryString = 'SELECT * FROM playball_pitching WHERE nameLast REGEXP' + "'" + chosen +"'" +"AND POS = "+"'"+chosenPosition+"'"+";";
		console.log(queryString);
		connection.query(queryString, function (err, res) {
			players = res;
			console.log(res);
	});
	res.send(players);
	})





app.post("/api/submit",function(req,res){
	var teamNew = req.body;
});




};


