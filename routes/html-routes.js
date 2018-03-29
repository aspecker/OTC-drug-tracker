
var path = require("path");
const db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  const checkUser = (req) => {
    console.log(req.user ? req.user.email : "Sign In");
    return req.user ? req.user.email : "Sign In";
  }

  // renders index on root
  app.get("/", function(req, res) {
    res.render("index", {username: checkUser(req)});
  });

  //login route with redirect to meds
  app.get("/login", function (req, res) {
    if (req.user) {
      return res.redirect("/meds");
    }
    else {
      res.render("login", {username: checkUser(req)});
    }
  });

    
  // signup page route
  app.get('/signup', (req,res)=>{
    res.render('signup', {username: checkUser(req)})
  })

  // med page route
  app.get("/meds", isAuthenticated, function(req, res) {
    // sequelize finds user meds
    db.Med.findAll({where: {
			userId: req.user.id
		}}).then(results => {
    // renders user meds using handlebars partial
    res.render('mypillpal', {
      username : checkUser(req),
      meds: results
    });
    });
  });

  // search page route
  app.get('/search', function(req,res){
    res.render('search', {username: checkUser(req)})
  })

};
