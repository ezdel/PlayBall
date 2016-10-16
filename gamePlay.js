// game play algorithm
// (batters batting average + pitchers batting average against) divided by 2 = probability of hit
// then each player will have their own probability of what type of hit based on their percentage of
// singles, doubles, triples and home runs from the season being used
// if it is an out, the pitchers strike out percentage will determine if it's a strike out

// runners on base will always move up the same number of bases as the hit
// no double plays, sacrifices or stolen bases in this version

var homeba = .320;
var homebaa = .250;
var awayba = .300;
var awaybaa = .225;
var inn = 1;
var outs = 0;
var bases = [false, false, false];
var runs = 0;
var aruns = 0;
var hruns = 0;
var hrpct = 300;
var tplpct = 100;
var dblpct = 250;
var sglpct = 350;
var kpct = 144;
//kpct = SO divided by IPout times 1000

function pitch(){
	var hitprob = (homeba + awaybaa) / 2;
	hitprob = hitprob.toFixed(3);
	hitprob = hitprob * 1000;
	var ranNum = Math.floor(Math.random() * 1000) + 1;
	if (ranNum < hitprob){
		hit();
		console.log("Outs: " + outs);
		console.log("Runs: " + runs);
		console.log("Inning: " + inn);
	}
	else {
		out();
		console.log("Outs: " + outs);
		console.log("Runs: " + runs);
		console.log("Inning: " + inn);
	};
};

function hit(){
	var hitNum = Math.floor(Math.random() * 1000) + 1;
	if (hitNum < sglpct) {
		console.log("SINGLE");
		single();
	}
	else if (hitNum < (sglpct + dblpct)) {
		console.log("DOUBLE");
		double();
	}
	else if (hitNum < (sglpct + dblpct + tplpct)) {
		console.log("TRIPLE");
		triple();
	}
	else {
		console.log("HOME RUN")
		homerun();
	};
};

function out(){
	var SOnum = Math.floor(Math.random() * 1000) + 1;
	if (SOnum < kpct){
		outs++
		console.log("STRIKE OUT");
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
	};
	if (bases[1] === true){
		bases[1] = true;
		runs++;
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
	};
	if (bases[1] === true){
		bases[1] = false;
		runs++;
	};
	if (bases[0] === true){
		bases[0] = false;
		runs++;
	};
	if (bases = [false, false, false]){
		bases[2] = true;
	};
}; 

function homerun(){
	if (bases[2] === true){
		bases[2] = false;
		runs++;
	};
	if (bases[1] === true){
		bases[1] = false;
		runs++;
	};
	if (bases[0] === true){
		bases[0] = false;
		runs++;
	};
	runs++;
	return
}; 
 function awayOffense(){
	if (inn > 9){
		aruns = runs;
		console.log("The away team scored: " + aruns + " runs.");
		inn = 1;
		outs = 0;
		runs = 0;
		homeOffense();
		return;
	}
	if (outs < 3){
		pitch();
		awayOffense();
	}
	else {
		bases = [false, false, false];
		outs = 0;
		inn++
		awayOffense();
	};
};

function homeOffense(){

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
				pitch();
				homeOffense();
			}
			else {
				hruns = runs;
				gameOver();
				return;
			};
		};
	}
	else {
		homeBatting();
	};
};

function homeBatting() {
	if (outs < 3){
		pitch();
		homeOffense();
	}
	else {
		bases = [false, false, false];
		outs = 0;
		inn++;
		homeOffense();
	};
};

function gameOver(){
	console.log("Game Over! The home team scored: " + hruns + " and the away team scored: " + aruns);
	console.log("Inning at end: " + inn);
	return;
};
awayOffense();

