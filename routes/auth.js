var authController = require('../controllers/authcontroller.js');
var userRating = require("../models").userRating;

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
    res.render("rating");
  })

  // sending ratings to db
  app.post("/api/rating", function(req, res){
    console.log(req.body);
    userRating.create({
      rating: req.body.star,
      review: req.body.review,
      notes: req.body.note
    }).then(function(){
        res.redirect('/');
    });
  });

  // if logged in route to dashboard, else redirect to signin page
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
  };

};