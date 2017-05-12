// routes for displaying and saving data to the db

var db = require("../models");

module.exports = function(app){

	app.get("/api/users",function(req,res){
		db.user.findAll({
			include: [db.monthlyStatus]
		}).then(function(dbUser){
			res.json(dbUser);
		});
	});

	app.get("api/monthlyChallenge", function(req, res){
		db.MonthlyChallenge.findAll({}).then(function(dbMonthlyChallenge){
			res.json(dbMonthlyChallenge);
		});
	});


	app.get("/api/locations",function(req,res){
		db.location.findAll({
			include: [db.userRating]
		}).then(function(dbLocations){
			res.json(dbLocations);
		});
	});

	app.get("/api/userRatings", function(req, res){
		db.userRating.findAll({
			include: [db.user]
		}).then(function(dbUserRatings){
			res.json(dbUserRatings);
		});
	});

	app.get("/api/monthlystatus", function(req, res){
		db.monthlyStatus.findAll({
			include: [db.MonthlyChallenge]
		})
		.then(function(dbStatus){
			res.json(dbStatus);
		});
	});

	app.get("/api/MonthlyChallenge",function(req, res){
		db.MonthlyChallenge.findAll({}).then(function(dbMonthlyChallenge){
			res.json(dbMonthlyChallenge);
		});
	});

	app.get("/api/monthlyChallenge/locations",function(req, res){
		var currentLocations = [];
		var userLocations = [];
		db.MonthlyChallenge.findOne({
			where:{
				currentChallenge: 1
			}
		}).then(function(Challenge){
			db.location.findAll({
				include: [db.userRating]
			}).then(function(locations){
				// var currentLocations = [];
				for(i=0;i<locations.length;i++){
					switch(locations[i].id){
						case Challenge.location1Id:
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
				res.json(currentLocations);
			});

		});
	});


	app.post("/api/MonthlyChallenge",function(req, res){
		db.MonthlyChallenge.findAll({}).then(function(dbMonthlyChallenge){
			for(i=0;i<dbMonthlyChallenge.length;i++){

				db.MonthlyChallenge.update({
           			currentChallenge: 0
          		},{
            		where:{
             			id: dbMonthlyChallenge[i].id
            		}
          		});
			}

			console.log(req.body);
			console.log("--------------------------");
			db.MonthlyChallenge.update({
            	currentChallenge: 1
          		},{
            		where:{
              			id: req.body.id
            		}
          	});

		});

	});

	app.get("/api/leaderboard",function(req, res){
		db.user.findAll({}).then(function(data){
			var leaderboard = [];
			//calLeaderboard();
			//function calLeaderboard(){
				for(i=0;i<data.length;i++){

					badges = data[i].badges.split(",");

					var badgesCount = 0;
					for(j=0;j<badges.length;j++){

						badgesCount += parseInt(badges[j]);
					};

					iUser = {
						name: data[i].name,
						badges: badges,
						badgesCount: badgesCount
					};


					if (leaderboard.length === 0){
						leaderboard.push(iUser);
					}else{
						for(k=0;k<leaderboard.length;k++){
							console.log(leaderboard.length);
							if(iUser.badgesCount > leaderboard[k].badgesCount){
								leaderboard.splice(k,0,iUser);
								k++;
							}else if(k + 1 === leaderboard.length){

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
