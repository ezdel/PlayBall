var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./connection.js');
var mysql = require('mysql');
var Player = require('./player');
var players;

console.log(Player);


module.exports = function(app){

//ADD ADDITONAL FIELD IN THE QUERY BASED ON POSITION
app.get('/api-nonPitch/:player?/:positionType?', function (req, res) {	
	 var chosen = req.params.player;
	 var chosenPosition = req.params.positionType
	 console.log(chosenPosition);
	 if(chosenPosition === 'DH'){
	 	var queryString = 'SELECT * FROM playball_batting WHERE nameLast REGEXP' + "'" + chosen +"'"+";";
		
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
	// console.log(teamNew.team[0].playerID);
	// console.log(teamNew.team[1].playerID);
// ERIC'S GAME LOGIC
	// Hey Eric! thanks for the help again! The console logs above this comment are how you will parse through
	//the array of objects. teamNew.team[0].playerID gets you the first player's ID in the team array and so on.
	// If you have any questions I'm just a slack away. Also I might be working on adding team data to a table and
	// I might be using this file as well. I'll just make a copy of this and edit on another file just so you can 
	// focus on this one. Happy Coding!!
//  var playerA1 = new Player(teamNew.team[0].playerID, "Rose", "1B", 685, 185, 33, 10, 9, 58);
//  var playerA2 = new Player(teamNew.team[1].playerID, "McBride", "RF", 554, 171, 42, 1, 1, 33);
//  var playerA3 = new Player(teamNew.team[2].playerID, "CF", 549, 142, 31, 3, 11, 52);
//  var playerA4 = new Player("Mike", "Schmidt", "3B", 548, 157, 25, 8, 48, 119);
//  var playerA5 = new Player("Greg", "Luzinski", "LF", 386, 84, 19, 1, 19, 100);
//  var playerA6 = new Player("Bob", "Boone", "C", 480, 110, 23, 1, 9, 41);
//  var playerA7 = new Player("Larry", "Bowa", "SS", 540, 144, 16, 4, 2, 28);
//  var playerA8 = new Player("Manny", "Trillo", "2B", 531, 155, 25, 9, 7, 46);
//  var playerA9 = new Player("Steve", "Carlton", "P", 101, 19, 1, 0, 0, 21, .21, 912, 286);

//  var playerH1 = new Player("Jimmy", "Rollins", "SS", 556, 154, 38, 9, 11, 55);
//  var playerH2 = new Player("Shane", "Victorino", "CF", 570, 167, 30, 8, 14, 69);
//  var playerH3 = new Player("Chase", "Utley", "2B", 607, 177, 41, 4, 33, 104);
//  var playerH4 = new Player("Ryan", "Howard", "1B", 610, 153, 26, 4, 48, 199);
//  var playerH5 = new Player("Pat", "Burrell", "LF", 536, 134, 33, 3, 33, 136);
//  var playerH6 = new Player("Jayson", "Werth", "RF", 418, 114, 16, 3, 24, 119);
//  var playerH7 = new Player("Pedro", "Feliz", "3B", 425, 106, 19, 2, 14, 54);
//  var playerH8 = new Player("Carlos", "Ruiz", "C", 320, 70, 14, 0, 4, 38);
//  var playerH9 = new Player("Cole", "Hamels", "P", 76, 17, 2, 0, 0, 29, .227, 682, 196);

 var teamA = [playerA1, playerA2, playerA3, playerA4, playerA5, playerA6, playerA7, playerA8, playerA9];



 var playerA1 = new Player(teamNew.team[0].nameFirst, teamNew.team[0].nameLast, teamNew.team[0].AB, teamNew.team[0].H, teamNew.team[0].doubles, teamNew.team[0].triples, teamNew.team[0].HR, teamNew.team[0].SO);
 var playerA2 = new Player(teamNew.team[1].nameFirst, teamNew.team[1].nameLast, teamNew.team[1].AB, teamNew.team[1].H, teamNew.team[1].doubles, teamNew.team[1].triples, teamNew.team[1].HR, teamNew.team[1].SO);
  var playerA3 = new Player(teamNew.team[2].nameFirst, teamNew.team[2].nameLast, teamNew.team[2].AB, teamNew.team[2].H, teamNew.team[2].doubles, teamNew.team[2].triples, teamNew.team[2].HR, teamNew.team[2].SO);
 var playerA4 = new Player(teamNew.team[3].nameFirst, teamNew.team[3].nameLast, teamNew.team[3].AB, teamNew.team[3].H, teamNew.team[3].doubles, teamNew.team[3].triples, teamNew.team[3].HR, teamNew.team[3].SO);
 var playerA5 = new Player(teamNew.team[4].nameFirst, teamNew.team[4].nameLast, teamNew.team[4].AB, teamNew.team[4].H, teamNew.team[4].doubles, teamNew.team[4].triples, teamNew.team[4].HR, teamNew.team[4].SO);
 var playerA6 = new Player(teamNew.team[5].nameFirst, teamNew.team[5].nameLast, teamNew.team[5].AB, teamNew.team[5].H, teamNew.team[5].doubles, teamNew.team[5].triples, teamNew.team[5].HR, teamNew.team[5].SO);
 var playerA7 = new Player(teamNew.team[6].nameFirst, teamNew.team[6].nameLast, teamNew.team[6].AB, teamNew.team[6].H, teamNew.team[6].doubles, teamNew.team[6].triples, teamNew.team[6].HR, teamNew.team[6].SO);
 var playerA8 = new Player(teamNew.team[7].nameFirst, teamNew.team[7].nameLast, teamNew.team[7].AB, teamNew.team[7].H, teamNew.team[7].doubles, teamNew.team[7].triples, teamNew.team[7].HR, teamNew.team[7].SO);
 var playerA9 = new Player(teamNew.team[8].nameFirst, teamNew.team[8].nameLast, teamNew.team[8].AB, teamNew.team[8].H, teamNew.team[8].doubles, teamNew.team[8].triples, teamNew.team[8].HR, teamNew.team[8].SO);
 var playerA10 = new Player(teamNew.team[9].nameFirst, teamNew.team[9].nameLast, 0, 0, 0, 0, 0, 0, teamNew.team[0].BAOpp, teamNew.team[0].IPOuts, teamNew.team[0].SO);

var teamA = [playerA1, playerA2, playerA3, playerA4, playerA5, playerA6, playerA7, playerA8, playerA9];

console.log(teamA);

})



}


