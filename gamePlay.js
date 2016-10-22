
var g = require("api-routes.js");
var teamH = g.homeTeam;
var teamA = g.awayTeam;
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
		batter.sgls++;
		single();
	}
	else if (hitNum < (batter.singlepct + batter.doublepct)) {
		console.log("DOUBLE");
		batter.dbls++;
		double();
	}
	else if (hitNum < (batter.singlepct + batter.doublepct + batter.triplepct)) {
		console.log("TRIPLE");
		batter.trpls++;
		triple();
	}
	else {
		console.log("HOME RUN")
		batter.hrs++;
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

$("#startGame").on('click', function(){
	startGame(teamA, teamH);

})

