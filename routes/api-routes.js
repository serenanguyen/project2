// routes for displaying and saving data to the db

var db = require("../models");

module.exports = function(app){

	app.get("/api/users",function(req,res){
		db.user.findAll({
		}).then(function(dbUser){
			res.json(dbUser);
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
		db.monthlyStatus.findAll({})
		.then(function(dbStatus){
			res.json(dbStatus);
		});
	});

	app.get("/api/test", function(req,res){
		db.monthlyStatus.findOne({
			where: {
				userId: 7
			}
		})
		.then(function(object){

			res.json(object);
		});
	});

	app.get("/api/MonthlyChallenge",function(req, res){
		db.MonthlyChallenge.findAll({}).then(function(dbMonthlyChallenge){
			res.json(dbMonthlyChallenge);
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
