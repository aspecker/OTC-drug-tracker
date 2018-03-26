var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.get('/search',function(req,res){
    res.sendFile(path.join(__dirname, '/public/search.html'))
  })

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/meds");
    }
    res.sendFile(path.join(__dirname, "/public/login.html"));
  });

  app.get("/meds", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "/public/members.html"));
  });

};
