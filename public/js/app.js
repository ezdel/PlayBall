var currentURL = window.location.origin; 

$(document).ready(function(){
	  	console.log('hit');
$.get(currentURL + "/api/show", function(res){ 
	for(i=0;i<500;i++){
      $("#testList").append("<li value="+ res[i].nameGiven+">"+"<h3>"+res[i].nameGiven +"</h3>" +"</li>");
      }
         })
	 });		

	



