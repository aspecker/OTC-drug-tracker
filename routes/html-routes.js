
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });

  app.get("/login", function(req, res) {
    // if (req.user) {
    //   res.redirect("/meds");
    // }
    res.render(path.join(__dirname, "../views/login.handlebars"));
  });

  app.get("/meds", isAuthenticated, function(req, res) {
    res.render('mypillpal');
  });

  // app.get('/search',function(req,res){
  //   res.sendFile(path.join(__dirname, '/public/search.html'))
  // })

};

