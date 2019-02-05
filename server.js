var express = require("express");
var bodyParser = require("body-parser");
var exphbs  = require('express-handlebars');
require('dotenv').config()
var nodemailer = require('nodemailer');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
app.get('/', function (req, res) {
	res.render('home');
});

app.get('/radiant-barrier', function(req, res) {
	res.render('rad-barrier');
});

app.get('/intelli-bag', function(req, res) {
	res.render('intelli-bag');
});

app.get('/solar-attic-fan', function(req, res) {
	res.render('solar-attic-fan');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});

app.post('/contact', function(req, res) {
	console.log(req.body)
	var transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 465,
		secure: true, 
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});
	
	var mailOptions = {
		from: 'tim3116tim@zoho.com',
		to: 'timhayes3116@gmail.com',
		subject: 'New Contact',
		html: `<p>First Name: ${req.body.firstName}</p><p>Last Name: ${req.body.lastName}</p><p>Email: ${req.body.email}</p><p>Phone: ${req.body.phone}</p><p>Message: ${req.body.message}</p>`
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			var mailOptionsSender = {
				from: 'tim3116tim@zoho.com',
				to: req.body.email,
				subject: 'Contact Made',
				html: `<p>Thank you for your interest.</p><p>A representative will contact you shortly!</p>`
			};
			transporter.sendMail(mailOptionsSender, function(error, info){
				if (error) {
					console.log(error);
				} else {
					console.log(info)
				}
			});
		}
	});
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});