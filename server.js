var express = require("express");
var bodyParser = require("body-parser");
// require models for syncing
var db = require("./models");

var PORT = 3000;
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// static directory
app.use(express.statis("./public"));

// routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// sync models to db before connecting to database so server won't start if there is an error connecting to db or before db is ready
db.sequelize.sync({force:true}).then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
  });
});
