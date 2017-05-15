// routes for displaying and saving data to the db
// require models folder
var db = require("../models");

module.exports = function(app) {
	// display json of all monthly challenges
  app.get("/api/monthlyChallenge", function(req, res) {
    db.MonthlyChallenge.findAll({}).then(function(dbMonthlyChallenge) {
      res.json(dbMonthlyChallenge);
    });
  });
	// json of all locations and their user ratings
  app.get("/api/locations", function(req, res) {
    db.location.findAll({
      include: [db.userRating]
    }).then(function(dbLocations) {
      res.json(dbLocations);
    });
  });
	// json of all users
	app.get("/api/users", function(req, res) {
		db.user.findAll({}).then(function(dbUser) {
			res.json(dbUser);
		});
	});
	// json of all user ratings and user associated
  app.get("/api/userRatings", function(req, res) {
    db.userRating.findAll({
      include: [db.user]
    }).then(function(dbUserRatings) {
      res.json(dbUserRatings);
    });
  });

  // updating current monthly challenge
  app.post("/api/MonthlyChallenge", function(req, res) {
    db.MonthlyChallenge.findAll({}).then(function(dbMonthlyChallenge) {
      for (i = 0; i < dbMonthlyChallenge.length; i++) {
				//change all current challenges to false
        db.MonthlyChallenge.update({
          currentChallenge: 0
        }, {
          where: {
            id: dbMonthlyChallenge[i].id
          }
        });
      }
			// change current monthly challenge to true
      db.MonthlyChallenge.update({
        currentChallenge: 1
      }, {
        where: {
          id: req.body.id
        }
      });
    });
  });

  app.get("/api/leaderboard", function(req, res) {
    db.user.findAll({}).then(function(data) {
      var leaderboard = [];
      //calLeaderboard();
      //function calLeaderboard(){

        var badgesCount = 0;

      for (i = 0; i < data.length; i++) {

        if(data[i].badges != null && data[i].badges.length != 0){

        var badges = data[i].badges.split(",");
        console.log(badges);
        if (badges.length != 0) {
          badgesCount = badges.length - 1;
        }
      }
        // for(j=0;j<badges.length;j++){

        // 	badgesCount += parseInt(badges[j]);
        // };

        iUser = {
          name: data[i].name,
          badges: badges,
          badgesCount: badgesCount
        };

        if (leaderboard.length === 0) {
          leaderboard.push(iUser);
        } else {
          for (k = 0; k < leaderboard.length; k++) {
            console.log(leaderboard.length);
            if (iUser.badgesCount > leaderboard[k].badgesCount) {
              leaderboard.splice(k, 0, iUser);
              k++;
            } else if (k + 1 === leaderboard.length) {

              leaderboard.push(iUser);
              k++;
            };
          };
        }
        console.log(leaderboard);
      };
      //}.then(function(){
      res.json(leaderboard);
      //})

    });
  });

};
