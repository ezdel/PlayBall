var express = require('express');
var path = require('path');

module.exports = function(app){

// DIFFERENT JS FILE
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../public/home.html'));
});

app.get('/survey.html', function (req, res) {
	res.sendFile(path.join(__dirname, '../public/survey.html'));
});

}