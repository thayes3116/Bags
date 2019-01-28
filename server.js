var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"}));


// Serve static content for the app from the "public" directory in the application directory.
app.use("/public",express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// connects to home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/radiant-barrier', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/rad-barrier.html'));
});

app.get('/intelli-bag', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/intelli-bag.html'));
});

app.get('/solar-attic-fan', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/solar-attic-fan.html'));
});

app.get('/contact', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/contact.html'));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});