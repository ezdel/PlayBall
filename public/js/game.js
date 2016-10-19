$(function() {
console.log("Ready!");

		var teamsName;
		var playersName;
		var teamArray = [];
		$('#submitTeam').on('click', function(e){
			e.preventDefault();
			teamsName = $('#teamName').val().trim();
				console.log(teamsName);
				localStorage.setItem("team", teamsName);
			$('#teamName').val('');

			window.location = '/lineup';
        });
		
        $('#submitPlayer').on('click', function(e){
			e.preventDefault();
			playersName = $('#playerName').val().trim();
				console.log(playersName);

				
					$('#playerName').val('');
					$("#playerRF").html(playersName);
					teamsName = localStorage.getItem('team');
					console.log(teamsName);
					$("#teamRF").html(teamsName);

					teamArray.push(playersName);

					if (teamArray.length == 9){
						$('#submitPlayer').on('click', function(e){
							window.location = '/rival';
						});
					}
			
				
        });



    });

// var currentURL = window.location.origin; 
// $('#playerSearch').keypress(function () {
//   $("#results").empty();
// var searchedPlayer = $('#playerSearch').val();
// console.log(searchedPlayer);
// $.get(currentURL + /api/+ searchedPlayer, function(res){ 
// for(i=0;i<500;i++){
//       $("#results").append("<ul>"+"<li>" +"<h3>"+"<button id='player' value="+ res[i].nameGiven+">"+res[i].nameGiven + "</button>" +"</h3>" +"</li>"+ "</ul>");
//       }
// });
// })
// //gets value of button 
// $("body").on("click","#player" ,function(){
//   var buttonValue = $(this).val();
//   console.log(buttonValue);
// })
