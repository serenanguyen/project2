var authController = require('../controllers/authcontroller.js');
var userRating = require("../models").userRating;
var User = require("../models").user;
var location = require("../models").location;

module.exports = function(app, passport) {
  app.get('/signup', authController.signup);

  app.get('/signin', authController.signin);

  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
  ));

  app.get('/dashboard', isLoggedIn, authController.dashboard);

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
      locationId: req.body.locationId,
      userId: req.user.id
    }).then(function(){
        res.redirect('/');
    });
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
