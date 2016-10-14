var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();


var app = express();


app.set('port', (7015));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


require('./routing/api-routes.js')(app); 
require('./routing/html-routes.js')(app);

app.listen(app.get('port'), function () {
	console.log('App listening on PORT ', app.get('port'));
});