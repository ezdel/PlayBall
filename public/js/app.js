var currentURL = window.location.origin; 
var team =[];
var teamFinal;
var submitTeam;
var teamsName;
var playersName;



// ---HOME---

$('#submitHomeTeam').on('click', function(e){
			e.preventDefault();
			teamsName = $('#teamName').val();
				console.log(teamsName);
				localStorage.setItem("team", teamsName);
			$('#teamName').val('');
			window.location = '/lineup';
        
        });


// ---LINEUP---
$('#playerName').keypress(function () {
    var positionType = $("#positionType").val();
  $("#results").empty();
if(positionType === 'C' ||positionType === '1B'|| positionType === '2B' || positionType === '3B'|| positionType === 'SS'||
    positionType === 'OF' || positionType === 'CF'|| positionType === 'DH'){
var searchedPlayer = $('#playerName').val();
    console.log(searchedPlayer);         
$.get(currentURL + "/api-nonPitch/"+ searchedPlayer +"/" + positionType, function(res){ 
for(i=0;i<res.length;i++){
       var b = $('<button>');
       b.attr("value", JSON.stringify(res[i]));
       b.attr("id", "player");
       if(res[i].nameFirst||res[i].nameLast||res[i].POS||res[i].yearID){
       b.text(res[i].nameFirst + " " + res[i].nameLast + " " + res[i].POS + " " +  res[i].yearID);
        }else{
        $("#results").empty();
        $("#results").append("<h1>"+ "PlayBall!" + "</h1>")
        }
       b.addClass("class","btn");
       b.addClass("btn-primary");
       $("#results").append(b);
      }
});
}else{
    var searchedPlayer = $('#playerName').val();                
    //Work on this get request tomorrow morning with different tables and clean this up
    $.get(currentURL + "/api-Pitch/"+ searchedPlayer +"/" + positionType, function(res){ 
for(i=0;i<res.length;i++){
       var b = $('<button>');
       b.attr("value", JSON.stringify(res[i]));
       b.attr("id", "player");
       if(res[i].nameFirst||res[i].nameLast||res[i].POS||res[i].yearID){
       b.text(res[i].nameFirst + " " + res[i].nameLast + " " + res[i].POS + " " +  res[i].yearID);
        }else{
        $("#results").empty();
        $("#results").append("<h1>"+ "PlayBall!" + "</h1>")
        }
       b.addClass("class","btn");
       b.addClass("btn-primary");
       $("#results").append(b);
      }
});
}
}); 


$("body").on("click","#player" ,function(e){
 e.preventDefault();
 var buttonValue = jQuery.parseJSON($(this).val());
 //auth part

var positionCurrent = buttonValue.POS;
console.log(positionCurrent);
 if(positionCurrent === 'OF'){
 	team.push(buttonValue);
 	for (i = 0; i< team.length; i++){
 		if(team[i] != undefined && team.length === 1){
 			team[0] = buttonValue;
 			$("#playerRF").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 			var playerRFavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
 			$("#statRF").html('.' + playerRFavg);
 		} else if (team[i] != undefined && team.length === 2){
 			team[1] = buttonValue;
 			$("#playerLF").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 			var playerLFavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
 			$("#statLF").html('.' + playerLFavg);
 		} else if (team[i] != undefined && team.length === 3){
 			team[2] = buttonValue;
 			$("#playerCF").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 			var playerCFavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
 			$("#statCF").html('.' + playerCFavg);
 		}
 	}
 
 }else if (positionCurrent === '1B'){
 	team[3] = buttonValue;
 	$("#player1B").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 	var player1Bavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
	player1Bavg = "." + player1Bavg;
 	$("#stat1B").html(player1Bavg);
 		console.log(team);
 }else if (positionCurrent === '2B'){
 	team[4] = buttonValue;
 	$("#player2B").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 	var player2Bavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
	player2Bavg = "." + player2Bavg;
 	$("#stat2B").html(player2Bavg);
 		console.log(team);
 }else if (positionCurrent === '3B'){
 	team[5] = buttonValue;
 	$("#player3B").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 	var player3Bavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
	player3Bavg = "." + player3Bavg;
 	$("#stat3B").html(player3Bavg);
 		console.log(team);
 }else if (positionCurrent === 'SS'){
 	team[6] = buttonValue;
 	$("#playerSS").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 	var playerSSavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
	playerSSavg = "." + playerSSavg;
 	$("#statSS").html(playerSSavg);
 		console.log(team);
 }else if (positionCurrent === 'C'){
 	team[7] = buttonValue;
 	$("#playerC").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 	var playerCavg = Math.round(1000 * (buttonValue.H / buttonValue.AB));
	playerCavg = "." + playerCavg;
 	$("#statC").html(playerCavg);
 		console.log(team);
 }else if (positionCurrent === 'P'){
 	team[8] = buttonValue;
 	$("#playerP").html(buttonValue.nameFirst + ' ').append(buttonValue.nameLast);
 	var pitcherBAOpp = Math.round(1000 * buttonValue.BAOpp);
 		$("#statP").html('.' + pitcherBAOpp);
 		console.log(team);
 } 
 if (positionCurrent != 'P' && positionCurrent === 'OF' && team.length === 9 ){
 	team[9] = buttonValue;
 	console.log('You\'re DH player is ' + buttonValue.nameFirst + ' ' + buttonValue.nameLast);
 	localStorage.setItem("homeTeam", JSON.stringify(team));
 }

});


$("#submitTeam").on('click',function(e){
    e.preventDefault();
    if (team.length === 10) {
        window.location = '/rival';
    teamFinal = {teamName: teamsName,
                 team:team}
    $.post(currentURL + "/api/submit", teamFinal, function(data){
     console.log("submitted");
    });
    } 
    return false;
});



 teamsName = localStorage.getItem('team');
var oppArr;
$('#2016indians').on('click', function(){
    
    $.get(currentURL + "/api/opponent", function(data){
          oppArr = data[0];
            console.log(oppArr);
            $('#playerRFrival').html(oppArr[6].nameFirst + ' ').append(oppArr[6].nameLast);
            var statRFrival = Math.round(1000 * (oppArr[6].H / oppArr[6].AB));
            statRFrival = '.'+ statRFrival;
            $('#statRFrival').html(statRFrival);

             $('#playerLFrival').html(oppArr[5].nameFirst + ' ').append(oppArr[5].nameLast);
            var statLFrival = Math.round(1000 * (oppArr[5].H / oppArr[5].AB));
            statLFrival = '.'+ statLFrival;
            $('#statLFrival').html(statLFrival);

            $('#playerCFrival').html(oppArr[7].nameFirst + ' ').append(oppArr[7].nameLast);
            var statCFrival = Math.round(1000 * (oppArr[7].H / oppArr[7].AB));
            statCFrival = '.'+ statCFrival;
            $('#statCFrival').html(statCFrival);

            $('#player1Brival').html(oppArr[1].nameFirst + ' ').append(oppArr[1].nameLast);
            var stat1Brival = Math.round(1000 * (oppArr[1].H / oppArr[1].AB));
            stat1Brival = '.'+ stat1Brival;
            $('#stat1Brival').html(stat1Brival);

             $('#player2Brival').html(oppArr[2].nameFirst + ' ').append(oppArr[2].nameLast);
            var stat2Brival = Math.round(1000 * (oppArr[2].H / oppArr[2].AB));
            stat2Brival = '.'+ stat2Brival;
            $('#stat2Brival').html(stat2Brival);

             $('#player3Brival').html(oppArr[3].nameFirst + ' ').append(oppArr[3].nameLast);
            var stat3Brival = Math.round(1000 * (oppArr[3].H / oppArr[3].AB));
            stat3Brival = '.'+ stat3Brival;
            $('#stat3Brival').html(stat3Brival);

             $('#playerSSrival').html(oppArr[4].nameFirst + ' ').append(oppArr[4].nameLast);
            var statSSrival = Math.round(1000 * (oppArr[4].H / oppArr[4].AB));
            statSSrival = '.'+ statSSrival;
            $('#statSSrival').html(statSSrival);

            $('#playerCrival').html(oppArr[7].nameFirst + ' ').append(oppArr[7].nameLast);
            var statCrival = Math.round(1000 * (oppArr[7].H / oppArr[7].AB));
            statCrival = '.'+ statCrival;
            $('#statCrival').html(statCrival);

            $('#playerCrival').html(oppArr[0].nameFirst + ' ').append(oppArr[0].nameLast);
            var statCrival = Math.round(1000 * (oppArr[0].H / oppArr[0].AB));
            statCrival = '.'+ statCrival;
            $('#statCrival').html(statCrival);

            $('#playerPrival').html(oppArr[9].nameFirst + ' ').append(oppArr[9].nameLast);
            var statPrival = Math.round(1000 * (oppArr[9].baOpp));
            statPrival = '.'+ statPrival;
            $('#statPrival').html(statPrival);
         localStorage.setItem("opponentTeam", JSON.stringify(data));
    });

  
});

  // submits page to move to gameStart
   $("#submitRival").on('click',function(e){
    e.preventDefault();
        window.location = '/gameStart';
    });
  











