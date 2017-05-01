
var express = require("express");
var db = require("./models");

var PORT = 3000;
var app = express();

//sync models to db before connecting to database so server won't start if there is an error connecting to db or before db is ready  
db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
  });
});
