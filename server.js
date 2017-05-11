var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var passport   = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy;
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

passport.use(new FacebookStrategy({
    clientID: 181332272390026,
    clientSecret: "bc28df959f95f8ed51d6b5857fc1a2c3",
    callbackURL: "http://localhost:8080"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate( function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/signUp' }));

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

require('./config/passport/passport.js')(passport, db.user, db.monthlyStatus);

// sync models to db before connecting to database so server won't start if there is an error connecting to db or before db is ready


db.sequelize.sync({force:false})
.then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
  });
});
