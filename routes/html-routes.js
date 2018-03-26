
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("../views/index.handlebars");
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/meds");
    }
    res.render("../views/login.handlebars");
  });

  app.get("/meds", isAuthenticated, function(req, res) {
    res.render('../views/mypillpal.handlebars');
  });

  app.get('/search', function(req,res){
    res.render('../views/search.handlebars')
  })


};

