// Create constructor function that will take in player stats from database.
// Stats needed are AB, HITS, DOUBLE, TRIPLES, HOME RUNS
// For pitchers, need BATTING AVERAGE AGAINST, STRIKEOUTS and IPOUTS
// Players created for each game will be run through the game function in gamePlay.js
// Function will also store player data for each game, so that stats can be displayed at the end.
// After player constructors are created, wrap them in a team constructor.
// For computer teams, pull the player data into the contructor as well.

function Player(nameFirst, nameLast, pos, ab, hits, doubles, triples, homeruns, batterKs, baOpp, IPouts, pitcherKs){
	this.name = nameFirst + " " + nameLast,
	this.position = pos,
	this.ba = (hits / ab) * 1000,
	this.singlepct = ((hits - doubles - triples - homeruns) / hits) * 1000,
	this.doublepct = (doubles / hits) * 1000,
	this.triplepct = (triples / hits) * 1000,
	this.hrpct = (homeruns / hits) * 1000,
	this.soPctBatter = (batterKs / ab) * 1000,
	this.baOpp = baOpp * 1000,
	this.soPctPitcher = (pitcherKs / IPouts) * 1000,
	this.atbats = 0,
	this.singles = 0,
	this.doubles = 0,
	this.triples = 0,
	this.homeruns = 0,
	this.strikeouts = 0
};


 module.exports = Player;