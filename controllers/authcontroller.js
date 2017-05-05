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
          var hbsObject = { loc: locations };
          console.log("___________________________");
          console.log(hbsObject);
          console.log("___________________________");
          console.log("____________Name_______________");
          console.log(hbsObject.loc[0].dataValues.name);
          console.log("______________Name_____________");
        res.render('dashboard', locations);
    });

};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};
