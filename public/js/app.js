var currentURL = window.location.origin; 
$('#playerSearch').keypress(function () {
  $("#results").empty();
var searchedPlayer = $('#playerSearch').val();
console.log(searchedPlayer);
$.get(currentURL + /api/+ searchedPlayer, function(res){ 
for(i=0;i<500;i++){
      $("#results").append("<ul>"+"<li>" +"<h3>"+"<button id='player' value="+ res[i].nameGiven+">"+res[i].nameGiven + "</button>" +"</h3>" +"</li>"+ "</ul>");
      }
});
})
//gets value of button 
$("body").on("click","#player" ,function(){
  var buttonValue = $(this).val();
  console.log(buttonValue);
})
