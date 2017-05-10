// routes for sending users to different html pages

var path = require("path");
var db = require("../models");

module.exports = function(app){
  app.get("/",function(req,res){
  		res.render("index");
	});

  
  app.get("/locations/add",function(req,res){
  		res.render("LocationAdd");
	});

  app.get("/challenge/create",function(req, res){
    db.location.findAll({}).then(function(data){

      var hbsObject = {
        locations: data
      };
        res.render("ChallengeManager", hbsObject);
    });

    app.post("/challenge/create", function(req, res){
      db.user.findAll({}).then(function(data){
        for(i=0;i<data.length;i++){
          console.log(data[i]);
          var badges = data[i].badges;
          badges += ",0";
          db.user.update({
            badges: badges
          },{
            where:{
              id: data[i].id
            }
          });
        }
      });

      db.MonthlyChallenge.create(req.body).then(function(dbChallenge){
        console.log("lol");
        res.send('/challenge/create');
      });
    });
    
   
  });

  app.post("/locations/add",function(req,res){
  		//console.log(db);
		db.location.create(req.body).then(function(dblocation){
			res.json(dblocation);
  		});
	});

  app.delete("/locations/add/:id",function(req, res){
    db.location.destroy({
      where:{
        id: req.params.id
      }
    }).then(function(dblocation){
      res.json(dblocation);
    });
  });

};
