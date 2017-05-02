// routes for sending users to different html pages

var path = require("path");

module.exports = function(app){
  app.get("/",function(req,res){
  		res.render("index");
	});

  
  app.get("/locations/add",function(req,res){
  		res.render("LocationAdd");
	});
};
