//OTC Tracker Server

// require our dependencies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");

// Set up Ports and require models
let PORT = process.env.PORT || 8080;
const db = require('./models');

// set up express, session, body-parser and passport
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// handlebars express
const exphbs = require("express-handlebars");

// middleware establishing view engine
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// require our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// sync with database then run server
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
