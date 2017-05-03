// routes for sending users to different html pages

var path = require("path");

module.exports = function(app){
  app.get("/",function(req,res){
  		res.render("index");
	});

  // app.get("/signup",function(req,res){
  //     res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname,
    "../public/login.html"));
  });

  //  app.get("/createAccount",function(req,res){
  // 		res.render("index");
	// });

};
