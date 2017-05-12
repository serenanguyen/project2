var db = require("../models");

var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
};

exports.dashboard = function(req, res) {
  var currentLocations = [];
  var userLocations = [];
  db.MonthlyChallenge.findOne({
  where:{
    currentChallenge: 1
  }
}).then(function(Challenge){
  db.location.findAll({
    include: [db.userRating]
  }).then(function(locations){

    for(i=0;i<locations.length;i++){
      switch(locations[i].id){
        case Challenge.location1Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location2Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location3Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location4Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location5Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location6Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location7Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location8Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location9Id:
          currentLocations.push(locations[i]);
          break;
        case Challenge.location10Id:
          currentLocations.push(locations[i]);
          break;
      }
    }
    db.monthlyStatus.findOne({
      where: {
        userId: req.user.id,
        MonthlyChallengeId: Challenge.id
      }
    }).then(function(status){
      // console.log("CHALLENGE LOCATION: "+ + "STATUS ID: "+ status.location)
      for(i=0;i<currentLocations.length;i++){
        var locationStatus= {
          id: currentLocations[i].id,
          ratingAvg: currentLocations[i].ratingAvg,
          name: currentLocations[i].name,
          website: currentLocations[i].website,
          mapsUrl: currentLocations[i].mapsUrl,
          userRatings: currentLocations[i].userRatings,
          isCompleted: false
        }

        switch(currentLocations[i].id){
          case status.location1:
            userLocations.push(locationStatus);
            break;
          case status.location2:
            userLocations.push(locationStatus);
            break;
          case status.location3:
            userLocations.push(locationStatus);
            break;
          case status.location4:
            userLocations.push(locationStatus);
            break;
          case status.location5:
            userLocations.push(locationStatus);
            break;
          case status.location6:
            userLocations.push(locationStatus);
            break;
          case status.location7:
            userLocations.push(locationStatus);
            break;
          case status.location8:
            userLocations.push(locationStatus);
            break;
          case status.location9:
            userLocations.push(locationStatus);
            break;
          case status.location10:
            userLocations.push(locationStatus);
            break;
          default:
            userLocations.push({
              id: currentLocations[i].id,
              ratingAvg: currentLocations[i].ratingAvg,
              name: currentLocations[i].name,
              website: currentLocations[i].website,
              mapsUrl: currentLocations[i].mapsUrl,
              userRatings: currentLocations[i].userRatings,
              isCompleted: true
            })

        }
      }
    })
  });
});

  var hbsObject = {
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
