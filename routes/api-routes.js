// CORE API Query
// https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {

	// return all meds for current user from database
	app.get("/api/meds", (req, res) => {
		db.Med.findAll({where: {
			userId: req.user.id
		}}).then(results => {
				res.json(results);
		})
	});

	// create a medicine in the database for current user based on search term input
	app.post("/api/add", (req, res) => {
		db.Med.create({
			userId: req.user.id,
			brandName: req.body.brand_name,
			genericName: req.body.generic_name,
			fdaMedId: req.body.id
		}).then(() => console.log(`${req.user.id} has added ${req.body.id} medicine to database`))
	});

	//local login
	app.post("/api/login", passport.authenticate("local"), (req, res) => {
		res.redirect("/search");
	});

	//local signup
	app.post("/api/signup", function(req, res) {
		db.User.create({
			email: req.body.email,
			password: req.body.password
		}).then(function() {
			res.redirect(307, "/api/login");
		}).catch(function(err) {
			console.log(err);
			res.json(err);
		});
	});

	//logout current user
	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

};
