var currentURL = window.location.origin; 
var team =[];
var teamFinal;
var submitTeam;
var teamsName;
var playersName;
var counter = 0;


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
 // auth part
 // team.push(buttonValue);
var positionCurrent = buttonValue.POS;
console.log(positionCurrent);
 if(positionCurrent === 'OF' && counter === 0){
 	team[0] = buttonValue;
 	counter ++;
 	console.log(team);
 }else if(positionCurrent === 'OF' && counter === 1){
 	team[1] = buttonValue;
 	counter ++;
 	console.log(team);
 }else if(positionCurrent === 'OF' && counter === 2){ 	
 	team[2] = buttonValue;
 	counter ++;
 	console.log(team);
 }else if (positionCurrent === '1B'){
 	team[3] = buttonValue;
 		console.log(team);
 }else if (positionCurrent === '2B'){
 	team[4] = buttonValue;
 		console.log(team);
 }else if (positionCurrent === '3B'){
 	team[5] = buttonValue;
 		console.log(team);
 }else if (positionCurrent === 'SS'){
 	team[6] = buttonValue;
 		console.log(team);
 }else if (positionCurrent === 'C'){
 	team[7] = buttonValue;
 		console.log(team);
 }else if (positionCurrent === 'P'){
 	team[8] = buttonValue;
 		console.log(team);
 }else if(counter >= 3 && team.length === 9){
 	team[9] = buttonValue;
 	console.log(team);
 }

   $("#team").empty();
 teamsName = localStorage.getItem('team');
 console.log(team);

})



//PUT THIS OUTSIDE $BODY FUNCTION
$("#submitTeam").on('click',function(e){
	 e.preventDefault();
// for(var i=0;i<team.length; i++){
// if(team[i] != undefined && team.length === 9){
	window.location = '/rival';
	teamFinal = {teamName: teamsName,
				 team:team}
	$.post(currentURL + "/api/submit", teamFinal, function(data){
	 console.log("submitted");
	});
	//}
 //}
});


	
	
		
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











