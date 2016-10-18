var currentURL = window.location.origin; 
var team =[]
var teamFinal;
var submitTeam;
$('#playerSearch').keypress(function () {
  $("#results").empty();
var searchedPlayer = $('#playerSearch').val();
$.get(currentURL + "/api/"+ searchedPlayer, function(res){ 
for(i=0;i<res.length;i++){
       var b = $('<button>');
       b.attr("value", JSON.stringify(res[i]));
       b.attr("id", "player");
       b.text(res[i].nameFirst + " " + res[i].nameLast);
       $("#results").append(b);
       $("#results").append("</br>");
      }
});
})
//gets value of button 
$("body").on("click","#player" ,function(){
 var buttonValue = jQuery.parseJSON($(this).val());
 //console.log(buttonValue);
 team.push({player:buttonValue});
 console.log(team);
   $("#team").empty();
   $("#teamShow").empty();
 for (i=0; i<team.length; i++){
	$("#team").append(team[i].player.nameFirst + " "+team[i].player.nameLast + "</br>");
	$("#teamShow").append(team[i].player.nameFirst + " "+team[i].player.nameLast + "</br>");
	}


if(team.length === 2){
	$('#teamModal').modal('toggle');
	teamFinal = {team:team}
}


// For some reason this is submitting the array of objects 9 times
$("#teamSubmit").on("click", function(){
	console.log(team)
$.post(currentURL + "/api/submit", teamFinal, function(data){
	console.log(team);
	});
return false;
});




})





