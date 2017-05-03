var passport   = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var User = require('../models/user');

var env = require('dotenv').load();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// init passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({ usernameField:username }, function(err, user){
      if(err) { return done(err);}
      if(!user) {
        return done(null, false, { message: 'Incorrect username.'});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message: 'Incorrect password.'});
      }
      return done(null, user);
    });
  }
));
