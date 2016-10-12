var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./connection.js');
var mysql = require('mysql');
var html;


module.exports = function(app){


app.get('/api/show', function (req, res) {	
console.log('hit');	
	var queryString = 'SELECT * FROM master;';


var table ='master';
connection.query(queryString, function (err, res) {

	// html += '<ul>';
	// 	for (var i = 0; i < res[i].length; i++) {
	// 		html += '<li><p> Name: ' + res[i].name + '</p>' + ' </li>';
	// 	}

	// 	html += '</ul>';
	// if(err) throw err;

html = res;

return html;

	
});

res.send(html);

})
}


