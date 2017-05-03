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
  app.post("/locations/add",function(req,res){
  		//console.log(db);
		db.Location.create(req.body).then(function(dblocation){
			res.json(dblocation);
  		});
	});

};
