var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./connection.js');
var mysql = require('mysql');
var opponentData = require('../data/opponent.js');
var Player = require("../player.js");
var players;
var teamH = [];
var teamA =[];



module.exports = function(app){

//ADD ADDITONAL FIELD IN THE QUERY BASED ON POSITION
app.get('/api-nonPitch/:player?/:positionType?', function (req, res) {	
	 var chosen = req.params.player;
	 var chosenPosition = req.params.positionType
	// console.log(chosenPosition);
	 if(chosenPosition === 'DH'){

	 	var queryString = 'SELECT * FROM playball_batting WHERE nameLast REGEXP' + "'" + chosen +"'"+";";
		
	}else{
		var queryString = 'SELECT * FROM playball_batting WHERE nameLast REGEXP' + "'" + chosen +"'" +"AND POS = "+"'"+chosenPosition+"'"+";";


	}
		connection.query(queryString, function (err, res) {
			players = res;
			//console.log(res);
	});
	res.send(players);
	})

// This works when querying from another table
app.get('/api-Pitch/:player?/:positionType?', function (req, res) {	
	 var chosen = req.params.player;
	 var chosenPosition = req.params.positionType
		var queryString = 'SELECT * FROM playball_pitching WHERE nameLast REGEXP' + "'" + chosen +"'" +"AND POS = "+"'"+chosenPosition+"'"+";";

		console.log(queryString);

		//console.log(queryString);

		connection.query(queryString, function (err, res) {
			players = res;
			//console.log(res);
	});
	res.send(players);
	})



// ------ACCESS RIVAL PAGE------
	app.get('/api/opponent', function(req, res){
	     res.json(opponentData);
	});
	app.post('/api/opponent', function(req, res){
			opponentData.push(req.body);
	});




app.post("/api/submit",function(req,res){
	var teamNew = req.body
	console.log(teamNew.team[0]);
	//console.log(teamNew.team[0].nameFirst, teamNew.team[0].nameLast, teamNew.team[0].POS, teamNew.team[0].AB, teamNew.team[0].H, teamNew.team[0].doubles, teamNew.team[0].triples, teamNew.team[0].HR, teamNew.team[0].SO);
// ERIC'S GAME LOGIC
	// Hey Eric! thanks for the help again! The console logs above this comment are how you will parse through
	//the array of objects. teamNew.team[0].playerID gets you the first player's ID in the team array and so on.
	// If you have any questions I'm just a slack away. Also I might be working on adding team data to a table and
	// I might be using this file as well. I'll just make a copy of this and edit on another file just so you can 
	// focus on this one. Happy Coding!!




	
 var playerH1 = new Player(teamNew.team[0].nameFirst, teamNew.team[0].nameLast, teamNew.team[0].POS, parseInt(teamNew.team[0].AB), parseInt(teamNew.team[0].H), parseInt(teamNew.team[0].doubles), parseInt(teamNew.team[0].triples), parseInt(teamNew.team[0].HR), parseInt(teamNew.team[0].SO));
 var playerH2 = new Player(teamNew.team[1].nameFirst, teamNew.team[1].nameLast, teamNew.team[1].POS, parseInt(teamNew.team[1].AB), parseInt(teamNew.team[1].H), parseInt(teamNew.team[1].doubles), parseInt(teamNew.team[1].triples), parseInt(teamNew.team[1].HR), parseInt(teamNew.team[1].SO));
 var playerH3 = new Player(teamNew.team[2].nameFirst, teamNew.team[2].nameLast, teamNew.team[2].POS, parseInt(teamNew.team[2].AB), parseInt(teamNew.team[2].H), parseInt(teamNew.team[2].doubles), parseInt(teamNew.team[2].triples), parseInt(teamNew.team[2].HR), parseInt(teamNew.team[2].SO));
 var playerH4 = new Player(teamNew.team[3].nameFirst, teamNew.team[3].nameLast, teamNew.team[3].POS, parseInt(teamNew.team[3].AB), parseInt(teamNew.team[3].H), parseInt(teamNew.team[3].doubles), parseInt(teamNew.team[3].triples), parseInt(teamNew.team[3].HR), parseInt(teamNew.team[3].SO));
 var playerH5 = new Player(teamNew.team[4].nameFirst, teamNew.team[4].nameLast, teamNew.team[4].POS, parseInt(teamNew.team[4].AB), parseInt(teamNew.team[4].H), parseInt(teamNew.team[4].doubles), parseInt(teamNew.team[4].triples), parseInt(teamNew.team[4].HR), parseInt(teamNew.team[4].SO));
 var playerH6 = new Player(teamNew.team[5].nameFirst, teamNew.team[5].nameLast, teamNew.team[5].POS, parseInt(teamNew.team[5].AB), parseInt(teamNew.team[5].H), parseInt(teamNew.team[5].doubles), parseInt(teamNew.team[5].triples), parseInt(teamNew.team[5].HR), parseInt(teamNew.team[5].SO));
 var playerH7 = new Player(teamNew.team[6].nameFirst, teamNew.team[6].nameLast, teamNew.team[6].POS, parseInt(teamNew.team[6].AB), parseInt(teamNew.team[6].H), parseInt(teamNew.team[6].doubles), parseInt(teamNew.team[6].triples), parseInt(teamNew.team[6].HR), parseInt(teamNew.team[6].SO));
 var playerH8 = new Player(teamNew.team[7].nameFirst, teamNew.team[7].nameLast, teamNew.team[7].POS, parseInt(teamNew.team[7].AB), parseInt(teamNew.team[7].H), parseInt(teamNew.team[7].doubles), parseInt(teamNew.team[7].triples), parseInt(teamNew.team[7].HR), parseInt(teamNew.team[7].SO));
 var playerH9 = new Player(teamNew.team[8].nameFirst, teamNew.team[8].nameLast, teamNew.team[8].POS, parseInt(teamNew.team[8].AB), parseInt(teamNew.team[8].H), parseInt(teamNew.team[8].doubles), parseInt(teamNew.team[8].triples), parseInt(teamNew.team[8].HR), parseInt(teamNew.team[8].SO));
 var playerH10 = new Player(teamNew.team[9].nameFirst, teamNew.team[9].nameLast, teamNew.team[9].POS, 0, 0, 0, 0, 0, 0, parseInt(teamNew.team[0].baOpp), parseInt(teamNew.team[0].IPOuts), parseInt(teamNew.team[0].SO));

 
 teamH = [playerH1, playerH2, playerH3, playerH4, playerH5, playerH6, playerH7, playerH8, playerH9, playerH10];
 console.log(teamH);
 homeTeam(teamH);
 
 var playerA1 = new Player("Pete", "Rose", "1B", 685, 185, 33, 10, 9, 58);
 var playerA2 = new Player("Bake", "McBride", "RF", 554, 171, 42, 1, 1, 33);
 var playerA3 = new Player("Garry", "Maddox", "CF", 549, 142, 31, 3, 11, 52);
 var playerA4 = new Player("Mike", "Schmidt", "3B", 548, 157, 25, 8, 48, 119);
 var playerA5 = new Player("Greg", "Luzinski", "LF", 386, 84, 19, 1, 19, 100);
 var playerA6 = new Player("Bob", "Boone", "C", 480, 110, 23, 1, 9, 41);
 var playerA7 = new Player("Larry", "Bowa", "SS", 540, 144, 16, 4, 2, 28);
 var playerA8 = new Player("Manny", "Trillo", "2B", 531, 155, 25, 9, 7, 46);
 var playerA9 = new Player("Manny", "Trillo", "2B", 531, 155, 25, 9, 7, 46);
 var playerA10 = new Player("Steve", "Carlton", "P", 101, 19, 1, 0, 0, 21, .21, 912, 286);

teamA = [playerA1, playerA2, playerA3, playerA4, playerA5, playerA6, playerA7, playerA8, playerA9, playerA10];

console.log(teamA);
awayTeam(teamA);

});

};


// function homeTeam(teamH){
// 	return teamH;
// };
// function awayTeam(teamA){
// 	return teamA;
// };
// exports.homeTeam = homeTeam;
// exports.awayTeam = awayTeam;


