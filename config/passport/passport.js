var bCrypt = require('bcrypt-nodejs');
var db = require("../../models");

module.exports = function(passport, user){
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      // allows us to pass back the entire request to the cb
      passReqToCallback: true
    },
    function(req, username, password, done){
      var generateHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8),null);
      };
      User.findOne({
        where: {
          username: username
        }
      }).then(function(user){
        if(user){
          // return
          // done(null, false, {
          //   message: 'That username is already taken'
          // });
          console.log("That username is already taken");
        } else {

          //var badges = "0";
          //db.MonthlyChallenge.findAll({}).then(function(data){
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            // console.log(data[0].name);
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            // for(i=0;i<data.length - 1;i++){
            //   console.log(badges);
            //   badges += ",0"
            // };

             var userPassword = generateHash(password);
          var data =
          {
            username: username,
            name: req.body.name,
            email: req.body.email,
            password: userPassword//,
            //badges: badges
          };
          User.create(data).then(function(newUser, created){
            if(!newUser){
              return done(null, false);
            }
            if (newUser){
              return done(null, newUser);
            }
          });
         //});


         
        }
      });
    }
  ));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    // if found, instance of sequelize model is returned
    User.findById(id).then(function(user){
      if(user){
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done){
      var User = user;
      // compares password entered with bCrypt comparison method since we stored pw with bcrypt
      var isValidPassword = function(userpass, password){
        return bCrypt.compareSync(password, userpass);
      }
      User.findOne({
        where: {
          username: username
        }
      }).then(function(user){
        if(!user){
          return done(null, false, {
            message: 'Username does not exist'
          });
        }
        if(!isValidPassword(user.password, password)){
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        var userinfo = user.get();
        return done(null, userinfo);
      }).catch(function(err){
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your signin'
        });
      });
    }
  ));

};
