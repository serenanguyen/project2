// routes for displaying and saving data to the db
var db = ("../models");
var passport = require("passport");

module.exports = function(app){
	app.get("/api/users",function(req,res){
		db.User.findAll({}).then(function(dbUser){
			res.json(dbUser);
		});
	});

	app.get("/api/locations",function(req,res){
		db.Locations.findAll({}).then(function(dbLocations){
			res.json(dbLocations);
		});
	});

	app.get("/api/weekly-challenge",function(req,res){
		db.WeeklyChallenge.findAll({}).then(function(dbWeeklyChallenge){
			res.json(dbWeeklyChallenge);
		});
	});

  app.post('/login',
    passport.authenticate('local', {
      sucessRedirect: '/',
      failureRedirect: '/login'
    }));
};
