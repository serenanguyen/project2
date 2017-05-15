var db = require("../models");


var exports = module.exports = {}

// render signup handlebars
exports.signup = function(req, res) {
  res.render('signup');
};

// render signin handlebars
exports.signin = function(req, res) {
  res.render('signin');
};


exports.forgotPassword = function(req, res) {
    res.render('forgotPassword');
};

// exports.dashboard = function(req, res) {
  
  
  



//   db.location.findAll().then(function(locations){
//     console.log(req.user);
//     console.log("-----------------------");
//       var hbsObject = {
//         loc: locations,
//         user: req.user
//       };
//     res.render('dashboard', hbsObject);

// render dashboard handlebars
exports.dashboard = function(req, res) {
  // array to push locations objects
  var currentLocations = [];
  // array to push locations including monthly status
  var userLocations = [];

  db.MonthlyChallenge.findOne({
    // find current monthly challenge
    where: {
      currentChallenge: 1
    }
  }).then(function(Challenge) {
    //console.log(Challenge);
    // find all locations and include ratings associated
    db.location.findAll({
      include: [db.userRating]
    }).then(function(locations) {
      // for each location
      for (i = 0; i < locations.length; i++) {
        // if the ID of this location
        switch (locations[i].id) {
            // equals the location ID of the current monthly challenge
          case Challenge.location1Id:
            // push that location object to current locations and break out of loop
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
        // find monthly status of the current user and the current challenge
        where: {
          userId: req.user.id,
          MonthlyChallengeId: Challenge.id
        }
      }).then(function(status) {
        // for each location in currentLocations
        for (i = 0; i < currentLocations.length; i++) {
          // push this array if location has not been completed
          var locationStatus = {
            id: currentLocations[i].id,
            ratingAvg: currentLocations[i].ratingAvg,
            name: currentLocations[i].name,
            website: currentLocations[i].website,
            mapsUrl: currentLocations[i].mapsUrl,
            userRatings: currentLocations[i].userRatings,
            isCompleted: false
          }
          // monthly status location field will be 0 if it has been completed
          // if the field = location id
          switch (currentLocations[i].id) {
            case status.location1:
              // push location status object defined above and break
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
              // if status = 0 then push this object where isCompleted: true
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

          var hbsObject = {

    // userLocations array we just defined
    loc: userLocations,
    // current user object
    user: req.user
  };
  console.log(hbsObject);
  // render dashboard handlebars and send object
  res.render('dashboard', hbsObject);
      })
    });
  });
  // pass this object for dashboard handlebars


};

// logout
exports.logout = function(req, res) {
  // end session
  req.session.destroy(function(err) {
    // redirect to index
    res.redirect('/');
  });
};
