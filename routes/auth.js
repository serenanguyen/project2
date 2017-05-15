var authController = require('../controllers/authcontroller.js');
var userRating = require("../models").userRating;
var User = require("../models").user;
var location = require("../models").location;
var monthlyStatus = require("../models").monthlyStatus;

var bCrypt = require('bcrypt-nodejs');


var status = require("../models").monthlyStatus;
var db = require("../models");

module.exports = function(app, passport) {
  app.get('/signup', authController.signup);

  app.get('/signin', authController.signin);

  app.get('/forgotPassword', authController.forgotPassword);

  app.post('/forgotPassword', function(req, res){
    var newPass = Math.random().toString(36).slice(-8);
    var helper = require('sendgrid').mail;
    var fromEmail = new helper.Email('huntandgatherapp@gmail.com');
    var toEmail = new helper.Email(req.body.email);
    var subject = 'HuntandGather Password Reset';
    var content = new helper.Content('text/plain', 'New password is ' + newPass);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')("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");



    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
      if (error) {
        console.log('Error response received');
      }
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(data){

      var generateHash = function(password){
        return bCrypt.hashSync(newPass, bCrypt.genSaltSync(8),null);
      };

      var hashPass = generateHash();

      User.update({
        password: hashPass
      },{
        where:{
          id: data.id
        }
      });
      console.log(data.id);

      res.redirect('/signin');
    });


  // location.findOne({
  //     where: {
  //       id: req.query.location_id
  //     }
  //   }).then(function(data){
  //     var locationObj = {
  //       user: req.user,
  //       location: data
  //     }
  //     res.render("rating", locationObj);
  //   });


    console.log(req.body.email);
  });

  app.post('/signup', passport.authenticate('local-signup', {

        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
  ));




  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout);
  // redirect to dashboard if signin was successful else redirect to signin page
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  }));

  // if user is logged in render rating page
  app.get("/rating", isLoggedIn, function(req, res) {
    // find location user is trying to rate
    // id in url
    location.findOne({
      where: {
        id: req.query.location_id
      }
    }).then(function(data) {
      // create object with user and location data
      var locationObj = {
        user: req.user,
        location: data
      }
      // render rating page and send object
      res.render("rating", locationObj);
    });
  });

  // sending ratings to db
  app.post("/api/rating", function(req, res) {
    // create new user rating object
    userRating.create({
      rating: req.body.star,
      review: req.body.review,
      notes: req.body.note,
      username: req.user.username,
      locationId: req.body.locationId,
      userId: req.user.id
    }).then(function() {
      db.location.findAll({
        include: [db.userRating]
      }).then(function(dbLocations) {
        for (i = 0; i < dbLocations.length; i++) {
          var avgRating = 0;
          if (dbLocations[i].userRatings.length > 0) {
            // add all ratings and average them
            for (j = 0; j < dbLocations[i].userRatings.length; j++) {
              avgRating += dbLocations[i].userRatings[j].rating;
            }
            avgRating = avgRating / dbLocations[i].userRatings.length;
          }
          db.location.update({
            ratingAvg: avgRating
          }, {
            where: {
              id: dbLocations[i].id
            }
          });
        }
      });
    }).then(function() {
      // update location column in monthly status to 0 if it is the location user just submitted a review for
      monthlyStatus.update({
        location1: 0
      }, {
        where: {
          userId: req.user.id,
          location1: req.body.locationId
        }
      });

      monthlyStatus.update({
        location2: 0
      }, {
        where: {
          userId: req.user.id,
          location2: req.body.locationId
        }
      });

      monthlyStatus.update({
        location3: 0
      }, {
        where: {
          userId: req.user.id,
          location3: req.body.locationId
        }
      });

      monthlyStatus.update({
        location4: 0
      }, {
        where: {
          userId: req.user.id,
          location4: req.body.locationId
        }
      });

      monthlyStatus.update({
        location5: 0
      }, {
        where: {
          userId: req.user.id,
          location5: req.body.locationId
        }
      });

      monthlyStatus.update({
        location6: 0
      }, {
        where: {
          userId: req.user.id,
          location6: req.body.locationId
        }
      });

      monthlyStatus.update({
        location7: 0
      }, {
        where: {
          userId: req.user.id,
          location7: req.body.locationId
        }
      });

      monthlyStatus.update({
        location8: 0
      }, {
        where: {
          userId: req.user.id,
          location8: req.body.locationId
        }
      });

      monthlyStatus.update({
        location9: 0
      }, {
        where: {
          userId: req.user.id,
          location9: req.body.locationId
        }
      });

      monthlyStatus.update({
        location10: 0
      }, {
        where: {
          userId: req.user.id,
          location10: req.body.locationId
        }
      }).then(function() {
        monthlyStatus.findOne({
          where: {
            userId: req.user.id
          }
        }).then(function(status) {
          var sum = (status.location1 + status.location2 + status.location3 + status.location4 + status.location5 + status.location6 + status.location7 + status.location8 + status.location8 + status.location9 + status.location10);
          // if the sum of the locations of user's monthly status is 0 then all locations have been reviewed and they earn a badge
          if (sum === 0) {
            User.findOne({
              where: {
                id: req.user.id
              }
            }).then(function(user) {
              var badges = user.badges;
              if (badges === null) {
                badges = status.MonthlyChallengeId + ","
              } else {
                badges += status.MonthlyChallengeId + ","
              }

              User.update({
                badges: badges
              }, {
                where: {
                  id: req.user.id
                }
              });
            });
          }
        });
      });
    }).then(function() {
      // after submitting review and updating monthly status redirect to dashboard
      res.redirect('/dashboard');
    })
  });


  // if logged in route to dashboard, else redirect to signin page
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/signin');
  };

};
