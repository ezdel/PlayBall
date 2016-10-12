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
var bases = [0, 0, 0, 0];
var hruns = 0;
var aruns = 0;
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
	console.log(ranNum);
	if (ranNum < hitprob){
		hit();
	}
	else {
		out();
	};
};

function hit(){
	var hitNum = Math.floor(Math.random() * 1000) + 1;
	if (hitNum < sglpct) {
		console.log("SINGLE");
	}
	else if (hitNum < (sglpct + dblpct)) {
		console.log("DOUBLE");
	}
	else if (hitNum < (sglpct + dblpct + tplpct)) {
		console.log("TRIPLE");
	}
	else {
		console.log("HOME RUN")
	};
};

function out(){
	var SOnum = Math.floor(Math.random() * 1000) + 1;
	console.log(SOnum);
	if (SOnum < kpct){
		console.log("STRIKE OUT");
	}
	else {
		console.log("OUT");
	}
}

pitch();