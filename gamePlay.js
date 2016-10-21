// game play algorithm
// (batters batting average + pitchers batting average against) divided by 2 = probability of hit
// then each player will have their own probability of what type of hit based on their percentage of
// singles, doubles, triples and home runs from the season being used
// if it is an out, the pitchers strike out percentage will determine if it's a strike out

// runners on base will always move up the same number of bases as the hit
// no double plays, sacrifices or stolen bases in this version
//var Player = require("./player.js");

var inn = 1;
var outs = 0;
var bases = [false, false, false];
var batter;
var pitcher;
var runs = 0;
var innruns = 0;
var aruns = 0;
var hruns = 0;
var ord = 0;
var awaybox = [];
var homebox = [];


function startGame(teamA, teamH){
	awayOffense(teamA, teamH);
};
function order(){
	ord++;
	if (ord > 8){
		ord = 0;
	};
};
function pitch(batter, pitcher){
	var hitprob = (batter.ba + pitcher.baOpp) / 2;
	hitprob = hitprob.toFixed(3);
	var ranNum = Math.floor(Math.random() * 1000) + 1;
	batter.atbats++;
	if (ranNum < hitprob){
		hit(batter, pitcher);
		order();
		console.log("Outs: " + outs);
		console.log("Runs: " + runs);
		console.log("Inning: " + inn);
	}
	else {
		out(batter, pitcher);
		order();
		console.log("Outs: " + outs);
		console.log("Runs: " + runs);
		console.log("Inning: " + inn);
	};
};

function hit(batter, pitcher){
	var hitNum = Math.floor(Math.random() * 1000) + 1;
	if (hitNum < batter.singlepct) {
		console.log("SINGLE");
		batter.singles++;
		single();
	}
	else if (hitNum < (batter.singlepct + batter.doublepct)) {
		console.log("DOUBLE");
		batter.doubles++;
		double();
	}
	else if (hitNum < (batter.singlepct + batter.doublepct + batter.triplepct)) {
		console.log("TRIPLE");
		batter.triples++;
		triple();
	}
	else {
		console.log("HOME RUN")
		batter.homeruns++;
		homerun();
	};
};

function out(batter, pitcher){
	var soNum = Math.floor(Math.random() * 1000) + 1;
	var soProb = (batter.soPctBatter + pitcher.soPctPitcher) / 2;
	if (soNum < soProb){
		outs++
		console.log("STRIKE OUT");
		batter.strikeouts++;
	}
	else {
		console.log("OUT");
		outs++
	}
}

function single(){
	if (bases[2] === true){
		bases[2] = false;
		bases[0] = true;
		runs++;
		innruns++;
	};
	if (bases[1] === true){
		bases[2] = true;
		bases[1] = false;
		bases[0] = true;
	};
	if (bases[0] === true){
		bases[1] = true;
		bases[0] = true;
	};
	if (bases = [false, false, false]){
		bases[0] = true;
	};
};

function double(){
	if (bases[2] === true){
		bases[2] = false;
		bases[1] = true;
		runs++;
		innruns++;
	};
	if (bases[1] === true){
		bases[1] = true;
		runs++;
		innruns++;
	};
	if (bases[0] === true){
		bases[2] = true;
		bases[0] = false;
	};
	if (bases = [false, false, false]){
		bases[1] = true;
	};

}; 

function triple(){
	if (bases[2] === true){
		bases[2] = false;
		runs++;
		innruns++;
	};
	if (bases[1] === true){
		bases[1] = false;
		runs++;
		innruns++;
	};
	if (bases[0] === true){
		bases[0] = false;
		runs++;
		innruns++;
	};
	if (bases = [false, false, false]){
		bases[2] = true;
	};
}; 

function homerun(){
	if (bases[2] === true){
		bases[2] = false;
		runs++;
		innruns++;
	};
	if (bases[1] === true){
		bases[1] = false;
		runs++;
		innruns++;
	};
	if (bases[0] === true){
		bases[0] = false;
		runs++;
		innruns++;
	};
	runs++;
	innruns++;
	return
}; 
 function awayOffense(teamA, teamH){
	batter = teamA[ord];
	pitcher = teamH[9];
	if (inn > 9){
		aruns = runs;
		console.log("The away team scored: " + aruns + " runs.");
		inn = 1;
		outs = 0;
		runs = 0;
		ord = 0;
		homeOffense(teamA, teamH);
		return;
	}
	if (outs < 3){
		pitch(batter, pitcher);
		awayOffense(teamA, teamH);
	}
	else {
		bases = [false, false, false];
		outs = 0;
		inn++
		awaybox.push(innruns);
		innruns = 0;
		awayOffense(teamA, teamH);
	};
};

function homeOffense(teamA, teamH){
	batter = teamH[ord];
	pitcher = teamA[9];
	if (inn > 9){
		hruns = runs;
		gameOver();
		return;
	}
	else if (inn === 9){
		if (runs > aruns){
			hruns = runs;
			gameOver();
			return;
		}
		else {
			if (outs < 3){
				pitch(batter, pitcher);
				homeOffense(teamA, teamH);
			}
			else {
				hruns = runs;
				gameOver();
				return;
			};
		};
	}
	else {
		homeBatting(teamA, teamH);
	};
};

function homeBatting() {
	if (outs < 3){
		pitch(batter, pitcher);
		homeOffense(teamA, teamH);
	}
	else {
		bases = [false, false, false];
		outs = 0;
		inn++;
		homebox.push(innruns);
		innruns = 0;
		homeOffense(teamA, teamH);
	};
};

function gameOver(){
	console.log("Game Over! The home team scored: " + homebox + " for a total of: " + hruns + " and the away team scored: " + awaybox + "for a total of: " + aruns);
	console.log("Inning at end: " + inn);
	for (i = 0; i < 9; i++) {
		console.log(teamA[i].name + " At Bats: " + teamA[i].atbats + " Singles: " + teamA[i].singles + " Doubles: " + teamA[i].doubles + " Triples: " + teamA[i].triples + " Home Runs: " + teamA[i].homeruns + " Strikeouts: " + teamA[i].strikeouts);
		console.log(teamH[i].name + " At Bats: " + teamH[i].atbats + " Singles: " + teamH[i].singles + " Doubles: " + teamH[i].doubles + " Triples: " + teamH[i].triples + " Home Runs: " + teamH[i].homeruns + " Strikeouts: " + teamH[i].strikeouts);
	};
	return;
};


 // var playerA1 = new Player("Pete", "Rose", "1B", 685, 185, 33, 10, 9, 58);
 // var playerA2 = new Player("Bake", "McBride", "RF", 554, 171, 42, 1, 1, 33);
 // var playerA3 = new Player("Garry", "Maddox", "CF", 549, 142, 31, 3, 11, 52);
 // var playerA4 = new Player("Mike", "Schmidt", "3B", 548, 157, 25, 8, 48, 119);
 // var playerA5 = new Player("Greg", "Luzinski", "LF", 386, 84, 19, 1, 19, 100);
 // var playerA6 = new Player("Bob", "Boone", "C", 480, 110, 23, 1, 9, 41);
 // var playerA7 = new Player("Larry", "Bowa", "SS", 540, 144, 16, 4, 2, 28);
 // var playerA8 = new Player("Manny", "Trillo", "2B", 531, 155, 25, 9, 7, 46);
 // var playerA9 = new Player("Manny", "Trillo", "2B", 531, 155, 25, 9, 7, 46);
 // var playerA10 = new Player("Steve", "Carlton", "P", 101, 19, 1, 0, 0, 21, .21, 912, 286);

 // var playerH1 = new Player("Jimmy", "Rollins", "SS", 556, 154, 38, 9, 11, 55);
 // var playerH2 = new Player("Shane", "Victorino", "CF", 570, 167, 30, 8, 14, 69);
 // var playerH3 = new Player("Chase", "Utley", "2B", 607, 177, 41, 4, 33, 104);
 // var playerH4 = new Player("Ryan", "Howard", "1B", 610, 153, 26, 4, 48, 199);
 // var playerH5 = new Player("Pat", "Burrell", "LF", 536, 134, 33, 3, 33, 136);
 // var playerH6 = new Player("Jayson", "Werth", "RF", 418, 114, 16, 3, 24, 119);
 // var playerH7 = new Player("Pedro", "Feliz", "3B", 425, 106, 19, 2, 14, 54);
 // var playerH8 = new Player("Carlos", "Ruiz", "C", 320, 70, 14, 0, 4, 38);
 // var playerH9 = new Player("Carlos", "Ruiz", "C", 320, 70, 14, 0, 4, 38);
 // var playerH10 = new Player("Cole", "Hamels", "P", 76, 17, 2, 0, 0, 29, .227, 682, 196);



 // var teamA = [playerA1, playerA2, playerA3, playerA4, playerA5, playerA6, playerA7, playerA8, playerA9, playerA10];
 // var teamH = [playerH1, playerH2, playerH3, playerH4, playerH5, playerH6, playerH7, playerH8, playerH9, playerH10];

startGame(teamA, teamH);

