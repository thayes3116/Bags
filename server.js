var express = require("express");
var bodyParser = require("body-parser");
var exphbs  = require('express-handlebars');

const Email = require('email-templates');
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
		service: 'gmail',
		port: 465,
    secure: true,
		auth: {
			user: 'timhayes3116@gmail.com',
			pass: 'timbill13'
		}
	});
	
	var mailOptions = {
		from: 'timhayes3116@gmail.com',
		to: 'timhayes3116@gmail.com',
		subject: 'New Contact',
		text: req.body
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
	// const email = new Email({
	// 	message: {
	// 		from: 'niftylettuce@gmail.com'
	// 	},
	// 	// uncomment below to send emails in development/test env:
	// 	send: true,
	// 	transport: {
	// 		jsonTransport: true
	// 	}
	// });
	
	// email
	// 	.send({
	// 		template: 'contact',
	// 		message: {
	// 			to: 'timhayes3116@gmail.com'
	// 		},
	// 		locals: req.body
	// 	})
	// 	.then(console.log)
	// 	.catch(console.error);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});