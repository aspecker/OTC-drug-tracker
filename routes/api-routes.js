// CORE API Query
// https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {

	app.get("/api/meds", (req, res) => {
		db.Med.findAll({where: {
			userId: req.user.id
		}}).then(results => {
				res.json(results);
		})
	});

	app.post("/api/add", (req, res) => {
		// console.log(req.body.id);
		db.Med.create({
			userId: req.user.id,
			brandName: req.body.brand_name,
			genericName: req.body.generic_name,
			fdaMedId: req.body.id
		}).then(() => console.log("WE DID IT"))
	});

	//PASSPORT LOGIN
/* 	app.post("/api/login", passport.authenticate("local"), (req, res) => {
		res.redirect("/search");
	}); */

/* app.post('api/login',
  passport.authenticate('local', { successRedirect: '/search',
                                   failureRedirect: 'api/login',
                                   failureFlash: true })
);
 */
app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      //console.log(err, user, info);
        if (err) { 
          return res.status(400).json({err}); // will generate a 500 error
      }
	  // Generate a JSON response reflecting authentication status
		
      if (!user) {
        return res.status(400).json({error: 'authentication failed'}); 
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        // res.send("success" );
        res.json("/search");
      });      
    })(req, res, next);

});
	
	//PASSPORT SIGNUP
	app.post("/api/signup", function(req, res) {
		db.User.create({
			email: req.body.email,
			password: req.body.password
		}).then(function() {
			res.redirect(307, "/api/login");
		}).catch(function(err) {
			console.log(err);
			//res.json(err);
			return res.status(400).json({err}); 
		});
	});

	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

	//PASSPORT CHECKS TO MAKE SURE USER IS VALID
	app.get("/api/user_data", function(req, res) {
		if (!req.user) {
			res.json({});
		} else {
			res.json({
				email: req.user.email,
				id: req.user.id
			});
		}
	});

};
