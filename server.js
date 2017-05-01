var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");

var PORT = 3000;
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//sync models to db before connecting to database so server won't start if there is an error connecting to db or before db is ready
db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
  });
});
