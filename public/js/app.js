var currentURL = window.location.origin; 
var team =[]
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
 console.log(buttonValue);
 team.push({player:buttonValue});
 console.log(team);
   $("#team").empty();
 for (i=0; i<team.length; i++){
	$("#team").append(team[i].player.nameFirst + " "+team[i].player.nameLast + "</br>");
	}
if(team.length === 1){
	$('#teamModal').modal('toggle');
}

$("#teamSubmit").on("click", function(){
submitTeam = $(this).val();
if(submitTeam === "yes"){
	console.log("Post Request");
$.post(currentURL + "/api/", team, function(data){
	console.log("SUBMITTED");
	});
}else{
	team.splice(0,team.length);
}
});




})





