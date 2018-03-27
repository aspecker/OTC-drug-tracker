
var path = require("path");
const db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      return res.redirect("/meds");
    }
    res.render("login");
  });

  app.get('/signup', (req,res)=>{
    res.render('signup')
  })

  app.get("/meds", isAuthenticated, function(req, res) {
    db.Med.findAll({where: {
			userId: req.user.id
		}}).then(results => {
    res.render('mypillpal', {
      meds: results
    });
    });
  });

  app.get('/search', function(req,res){
    res.render('search')
  })


};

