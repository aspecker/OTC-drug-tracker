var path = require("path");
const db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	const checkUser = (req) => {
		if (!req.user) {
			return {
				"active": false,
				"message": "Log In"
			}
		} else {

			return {
				"active": true,
				"message": req.user.email
			};
		}
	}

	// renders index on root
	app.get("/", function(req, res) {
		res.render("index", {
			isActive: checkUser(req).active,
			message: checkUser(req).message
		});
	});

	//login route with redirect to meds
	app.get("/login", function(req, res) {
		if (req.user) {
			return res.redirect("/meds");
		} else {
			res.render("login", {
				isActive: checkUser(req).active,
				message: checkUser(req).message
			});
		}
	});

	// signup page route
	app.get('/signup', (req, res) => {
		res.render('signup', {
			isActive: checkUser(req).active,
			message: checkUser(req).message
		})
	})

	// med page route
	app.get("/meds", isAuthenticated, function(req, res) {
		// sequelize finds user meds
		db.Med.findAll({
			where: {
				userId: req.user.id
			}
		}).then(results => {
			// renders user meds using handlebars partial
			res.render('meds', {
				// isActive: checkUser(req).active,
				// message: checkUser(req).message,
				meds: results
			});
		});
	});

	// search page route
	app.get('/search', function(req, res) {
		res.render('search', {
			isActive: checkUser(req).active,
			message: checkUser(req).message
		})
	})

};
