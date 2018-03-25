// CORE API Query
// https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {

	app.post("/api/search", (req, res) => {

		db.Med.findAll({}).then(results => {
				res.json(results);
		})
	});
	app.post("/api/add", (req, res) => {
		// const drugInfo = req.body.results[0]
		db.Med.create({
			userId: 2,
							//db.User.id
			fdaMedId: "ksnadkjnaskjdnaksj"
							//drugInfo.openfda.product_ndc[0]
		}).then(() => {
			//Refresh somehow
		})
	});
	app.post("/api/user/", (req, res) => {
		db.Med.findAll({
			where: {
				userId: 1
				 				//db.User.id - dtnamic value
			}
		}).then(userMeds => res.json(userMeds))
	});
	app.post("/api/login", passport.authenticate("local"), (req, res) => {
		res.json("/members");
	});

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

	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

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
