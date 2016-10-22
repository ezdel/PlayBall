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
        }
       // b.addClass("class","btn");
       b.addClass("searchResults");
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
        }
       // b.addClass("class","btn");
       b.addClass("searchResults");
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
 if (team.length === 9){
 	team[9] = buttonValue;
 	console.log('You\'re DH player is ' + buttonValue.nameFirst + ' ' + buttonValue.nameLast);
 	localStorage.setItem("homeTeam", JSON.stringify(team));
 }

});


$("#submitTeam").on('click',function(e){
	e.preventDefault();
	if (team.length === 10) {
		window.location = '/rival';
	} 
	return false;
});


// $("#submitPlayer").on('click',function(){
// for(var i=0;i<team.length; i++){
// if(team[i] != undefined && team.length === 9){
// 	window.location = '/rival';
// 	teamFinal = {team:team}
// 	$.post(currentURL + "/api/submit", teamFinal, function(data){
// 	 console.log("submitted");
// 	});
// 	}
//  }
// });

// Think of how to make it show in results array

 // for(i=0; i<team.length; i++){
	// $("#team").append(team[i].nameFirst + " "+team[i].nameLast + "</br>");
	// $("#teamShow").append(team[i].nameFirst + " "+team[i].nameLast + "</br>");
	// }




 teamsName = localStorage.getItem('team');

// })




	
	
		
   //      $('#submitPlayer').on('click', function(e){
			// e.preventDefault();
			// playersName = $('#playerName').val().trim();
			// 	console.log(playersName);

				
			// 		$('#playerName').val('');
			// 		$("#playerRF").html(playersName);
			// 		teamsName = localStorage.getItem('team');
			// 		console.log(teamsName);
			// 		$("#teamRF").html(teamsName);

			// 		teamArray.push(playersName);

			// 		if (teamArray.length == 9){
			// 			$('#submitPlayer').on('click', function(e){
			// 				window.location = '/rival';
			// 			});
			// 		}
			
				
   //      });
