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

require('./config/passport/passport.js')(passport, db.user);

// sync models to db before connecting to database so server won't start if there is an error connecting to db or before db is ready


db.sequelize.sync({force:false})
// .then(function(){
//      db.location.bulkCreate([
//         { name: "Taco Bell", ratingAvg: 2, address: "2000 Guadalupe St, Austin, TX 78705", website: "www.tacobell.com"},
//         { name: "Veracruz Tacos", ratingAvg: 4, address: "1704 E Cesar Chavez St, Austin, TX 78702", website: "www.veracruztacos.com"},
//         { name: "Arlo's", ratingAvg: 4, address: "900 Red River St, Austin, TX 78702", website: "www.patrizis.com"},
//         { name: "Patrizi's", ratingAvg: 5, address: "2307 Manor Rd, Austin, TX 78722", website: "www.pizzahut.com"},
//         { name: "DFG Noodles", ratingAvg: 5, address: "3505 N Interstate 35 Frontage Rd, Austin, TX 78722", website: "www.dfgfood.com"},
//         { name: "Song La", ratingAvg: 4, address: "411 W 23rd St, Austin, TX 78705", website: "www.songlafood.com"},
//         { name: "Cool Beans", ratingAvg: 4, address: "2908 Fruth St, Austin, TX 78705", website: "www.coolbeanseatery.com"},
//         { name: "Chi'Lantro", ratingAvg: 5, address: "1509 S Lamar Blvd, Austin, TX 78704", website: "www.chilantrobbq.com"},
//         { name: "Llama's", ratingAvg: 3, address: "611 Trinity St, Austin, TX 78701", website: "www.llamasfoodtrailer.com"},
//         { name: "Pizza Hut", ratingAvg: 5, address: "1234 Holly St., Austin TX 78747", website: "www.pizzahut.com"},
//         { name: "Burger Place", ratingAvg: 2, address: "1234 Holly St., Austin TX 78712", website: "www.burgerplace.com"}
//       ]);
//
//     return;
// })

.then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
  });
});
