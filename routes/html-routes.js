// routes for sending users to different html pages

var path = require("path");

module.exports = function(app){
  app.get("/",function(req,res){
  		res.render("index");
	});

  app.get("/addUser",function(req,res){
      res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname,
    "../public/login.html"));
  });
};
