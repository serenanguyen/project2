var authController = require('../controllers/authcontroller.js');
var userRating = require("../models").userRating;
var User = require("../models").user;
var location = require("../models").location;
var db = require("../models");

module.exports = function(app, passport) {
  app.get('/signup', authController.signup);

  app.get('/signin', authController.signin);

  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
  ));

  app.get('/dashboard', isLoggedIn, function(req, res){
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


  app.get('/logout',authController.logout);

  app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
  ));

  app.get("/rating", isLoggedIn, function(req,res){
    console.log(req.query.location_id);
    location.findOne({
      where: {
        id: req.query.location_id
      }
    }).then(function(data){
      var locationObj = {
        location: data
      }
      res.render("rating", locationObj);
    });

    // res.render("rating");
  });

  // sending ratings to db
  app.post("/api/rating", function(req, res){
    // console.log("params!!", req.params);
    // console.log("USER ID CURRENT!!!!! "+req.user.id);

    userRating.create({
      rating: req.body.star,
      review: req.body.review,
      notes: req.body.note,
      username: req.user.username,
      locationId: req.body.locationId,
      userId: req.user.id
    }).then(function(){
      db.location.findAll({
      include: [db.userRating]
    }).then(function(dbLocations){
     
      for(i=0;i<dbLocations.length;i++){
        var avgRating = 0;
        for(j=0;j<dbLocations[i].userRatings.length;j++){
          avgRating += dbLocations[i].userRatings[j].rating;
        }
        avgRating = avgRating/dbLocations[i].userRatings.length;

        db.location.update({
          ratingAvg: avgRating
        },{
        where:{
          id: dbLocations[i].id
         }
        });
      }
      
      res.redirect('/dashboard');

      });
        
    });

    
    });
  //});

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
