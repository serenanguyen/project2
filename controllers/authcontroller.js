var db = require("../models");

var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
};

exports.dashboard = function(req, res) {
  var monthlyStatus = {};
  var userLocations = {};
  var challengeLocations = [];
  // grab users monthly challenge status
  db.monthlyStatus.findOne({
    include: [db.MonthlyChallenge],
    where:{
      userId: req.user,
      currentChallenge: true
    }
  }).then(function(status){
    monthlyStatus = status;
  });
  challengeLocations = [
    monthlyStatus.location1Id,
    monthlyStatus.location2Id,
    monthlyStatus.location3Id,
    monthlyStatus.location4Id,
    monthlyStatus.location5Id,
    monthlyStatus.location6Id,
    monthlyStatus.location7Id,
    monthlyStatus.location8Id,
    monthlyStatus.location9Id,
    monthlyStatus.location10Id,
  ];

  // grab challenge locations
  db.location.findAll({
    where:{
      id: {
        $in: challengeLocations
      }
    }
  }).then(function(locations){
      userLocations = locations;
  });
  var hbsObject = {
    monthlyStatus: monthlyStatus,
    loc: userLocations,
    user: req.user
  };
  console.log(hbsObject);
  res.render('dashboard', hbsObject);
  };

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};
