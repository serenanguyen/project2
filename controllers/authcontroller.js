var db = require("../models");


var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
};

exports.forgotPassword = function(req, res) {
    res.render('forgotPassword');
};

exports.dashboard = function(req, res) {
  
  
  



  db.location.findAll().then(function(locations){
    console.log(req.user);
    console.log("-----------------------");
      var hbsObject = {
        loc: locations,
        user: req.user
      };
    res.render('dashboard', hbsObject);
  });
  
  };

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};
