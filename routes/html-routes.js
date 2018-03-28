
var path = require("path");
const db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  const checkUser = (req) => {
    console.log(req.user ? req.user.email : "Sign In");
    return req.user ? req.user.email : "Sign In";
  }

  app.get("/", function(req, res) {
    res.render("index", {username: checkUser(req)});
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      return res.redirect("/meds");
    }
    else {
      res.render("login");
    }
  });

  app.get('/signup', (req,res)=>{
    res.render('signup')
  })

  app.get("/meds", isAuthenticated, function(req, res) {
    db.Med.findAll({where: {
			userId: req.user.id
		}}).then(results => {
    res.render('mypillpal', {
      username : checkUser(req),
      meds: results
    });
    });
  });

  app.get('/search', function(req,res){
    res.render('search')
  })


};
