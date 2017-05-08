var db = require("../models");

var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
};

exports.dashboard = function(req, res) {
  db.location.findAll().then(function(locations){
    db.location.findOne({
      where: {
        id: req.query.location_id
      }
    }).then(function(data){
      var hbsObject = {
        loc: locations,
        user: req.user,
        location: data
      };
    res.render('dashboard', hbsObject);
    })

  });
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};
