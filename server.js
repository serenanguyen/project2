var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var passport   = require('passport');
var session = require('express-session');
var env = require('dotenv').load();
// init express

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(methodOverride("_method"));

// init passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true}));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// static dir
app.use(express.static("./public"));

// routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

var authRoute = require('./routes/auth.js')(app, passport);

require('./config/passport/passport.js')(passport, db.user);

// sync models to db before connecting to database so server won't start if there is an error connecting to db or before db is ready
db.sequelize.sync({force:false}).then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);

  });
});
