var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var User = require("../models/user");
// init passport
// app.use(express.session());
app.use(passport.initialize());
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
