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
    db.Location.findAll({}).then(function(data){

      var hbsObject = {
        locations: data
      };

      // db.Location.findAll({
      //   include:[
      //     {MonthlyChallenge, required: true}
      //   ]
      // }).then(function(challenge){

        //console.log(hbsObject);
        res.render("ChallengeManager", hbsObject);
      //});
    });

    app.post("/challenge/create", function(req, res){
      db.MonthlyChallenge.create(req.body).then(function(dbChallenge){
        console.log("lol");
        res.redirect("/challenge/create");
      });
    });
    
   
  });

  app.post("/locations/add",function(req,res){
  		//console.log(db);
		db.Location.create(req.body).then(function(dblocation){
			res.json(dblocation);
  		});
	});

  app.delete("/locations/add/:id",function(req, res){
    db.Location.destroy({
      where:{
        id: req.params.id
      }
    }).then(function(dblocation){
      res.json(dblocation);
    });
  });

};
