// routes for sending users to different html pages

var path = require("path");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });


  app.get("/locations/add", function(req, res) {
    res.render("LocationAdd");
  });


  app.get("/challenge/create", function(req, res) {
    db.location.findAll({}).then(function(data) {

      var hbsObject = {
        locations: data
      };
      res.render("challengeManager", hbsObject);
    });

    app.post("/challenge/create", function(req, res) {
      // db.user.findAll({}).then(function(data){
      //   for(i=0;i<data.length;i++){
      //     console.log(data[i]);
      //     var badges = data[i].badges;
      //     badges += ",0";
      //     db.user.update({
      //       badges: badges
      //     },{
      //       where:{
      //         id: data[i].id
      //       }
      //     });
      //   }
      // });

      db.MonthlyChallenge.create(req.body).then(function(dbChallenge) {
        db.user.findAll({}).then(function(data) {

          var userStatus = {
            location1: req.body.location1Id,
            location2: req.body.location2Id,
            location3: req.body.location3Id,
            location4: req.body.location4Id,
            location5: req.body.location5Id,
            location6: req.body.location6Id,
            location7: req.body.location7Id,
            location8: req.body.location8Id,
            location9: req.body.location9Id,
            location10: req.body.location10Id,
            MonthlyChallengeId: dbChallenge.id,
            userId: 0
          }

          for (i = 0; i < data.length; i++) {
            userStatus.userId = data[i].id;
            db.monthlyStatus.create(userStatus).then(function() {});
          }
        });
        res.send('/challenge/create');
      });
    });

  });

  app.post("/locations/add", function(req, res) {
    db.location.create(req.body).then(function(dblocation) {
      res.json(dblocation);
    });
  });

  app.delete("/locations/add/:id", function(req, res) {
    db.location.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dblocation) {
      res.json(dblocation);
    });
  });

};
