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
		console.log("Bases: " + bases);
		console.log("Runs: " + runs);
	}
	else {
		out();
		console.log("Bases: " + bases);
		console.log("Runs: " + runs);
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
		console.log("STRIKE OUT");
	}
	else {
		console.log("OUT");
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

pitch();
