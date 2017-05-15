var authController = require('../controllers/authcontroller.js');
var userRating = require("../models").userRating;
var User = require("../models").user;
var location = require("../models").location;
var monthlyStatus = require("../models").monthlyStatus;
var bCrypt = require('bcrypt-nodejs');
//const nodemailer = require('nodemailer');

//sendgrid stuff------------


//--------------------------


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

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);



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

  app.get('/dashboard', isLoggedIn, function(req, res){

    
  //   let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //       user: 'huntandgatherapp@gmail.com',
  //       pass: 'h&g0317UT'
  //   }
  // });

//     var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: 'huntandgatherapp@gmail.com',
//         pass: 'h&g0317UT'
//     }
// });

  // let mailOptions = {
  //   from: '"Team Hunt " <huntandgatherapp@gmail.com>', // sender address
  //   to: req.user.email, // list of receivers
  //   subject: 'Hello', // Subject line
  //   text: 'Hello world', // plain text body
  //   html: '<b>Hello world</b>' // html body
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //       return console.log(error);
  //   }
  //   console.log('Message %s sent: %s', info.messageId, info.response);
  // });






    location.findAll({
      include: [userRating]
    }).then(function(locations){
        var hbsObject = {
          loc: locations,
          user: req.user
        };
      res.render('dashboard', hbsObject);
    })
  });


  app.get('/logout', authController.logout);

  app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
  ));

  app.get("/rating", isLoggedIn, function(req,res){

    location.findOne({
      where: {
        id: req.query.location_id
      }
    }).then(function(data){
      var locationObj = {
        user: req.user,
        location: data
      }
      res.render("rating", locationObj);
    });

    // res.render("rating");
  });

  // sending ratings to db
  app.post("/api/rating", function(req, res){
    userRating.create({
      rating: req.body.star,
      review: req.body.review,
      notes: req.body.note,
      username: req.user.username,
      locationId: req.body.locationId,
      userId: req.user.id
    })
    .then(function(){
      db.location.findAll({
      include: [db.userRating]
    })
    .then(function(dbLocations){

      for(i=0;i<dbLocations.length;i++){
        var avgRating = 0;
        if(dbLocations[i].userRatings.length>0){
          for(j=0;j<dbLocations[i].userRatings.length;j++){
            avgRating += dbLocations[i].userRatings[j].rating;
          }
          avgRating = avgRating/dbLocations[i].userRatings.length;
        }

        db.location.update({
          ratingAvg: avgRating
        },{
        where:{
          id: dbLocations[i].id
         }
        });
      }

      });
    })
    .then(function(){

      monthlyStatus.update(
        {location1: 0},
        {where:
          {userId: req.user.id,
          location1: req.body.locationId}
        });

      monthlyStatus.update(
        {location2: 0},
        {where:
          {userId: req.user.id,
          location2: req.body.locationId}
        });

      monthlyStatus.update(
        {location3: 0},
        {where:
          {userId: req.user.id,
          location3: req.body.locationId}
        });

      monthlyStatus.update(
        {location4: 0},
        {where:
          {userId: req.user.id,
          location4: req.body.locationId}
        });

      monthlyStatus.update(
        {location5: 0},
        {where:
          {userId: req.user.id,
          location5: req.body.locationId}
        });

      monthlyStatus.update(
        {location6: 0},
        {where:
          {userId: req.user.id,
          location6: req.body.locationId}
        });

      monthlyStatus.update(
        {location7: 0},
        {where:
          {userId: req.user.id,
          location7: req.body.locationId}
        });

      monthlyStatus.update(
        {location8: 0},
        {where:
          {userId: req.user.id,
          location8: req.body.locationId}
        });

      monthlyStatus.update(
        {location9: 0},
        {where:
          {userId: req.user.id,
          location9: req.body.locationId}
        });

      monthlyStatus.update(
        {location10: 0},
        {where:
          {userId: req.user.id,
          location10: req.body.locationId}
        }).then(function(){
              monthlyStatus.findOne({
          where: {
            userId: req.user.id
          }
        })
        .then(function(status){
          var sum = (status.location1 + status.location2 + status.location3 + status.location4 + status.location5 + status.location6 + status.location7 + status.location8 + status.location8 + status.location9 + status.location10);
          console.log("---------------------------")
          console.log(sum);
          if(sum === 0){

            User.findOne({
              where: {
                id: req.user.id
              }
            })
            .then(function(user){
              var badges = user.badges;
              if(badges === null){
                badges = status.MonthlyChallengeId + ","
              }else{
                badges += status.MonthlyChallengeId + ","
              }

              User.update({
                badges: badges
              },{
                where:{
                  id: req.user.id
                }
              });
            });
          }
        });
        });

        // findone({userId:userid}{
        //   monthlyStatus.location1+ montl
        //   if(var = 0)
        //   set badge to true
        // })
        // set badge to challenge id if sum=0

    

      })
      .then(function(){
      res.redirect('/dashboard');
    })
  });


  app.get("/api/users", function(req,res){
    User.findAll({}).then(function(dbUser){
      res.json(dbUser);
    });
  });

  // if logged in route to dashboard, else redirect to signin page
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }

    res.redirect('/signin');
  };

};
