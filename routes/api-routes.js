// Routes handle user auth and interfacing with meds table
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
	//DB ROUTES
	// used to verify if user is logged in to prevent error when adding medicine
	app.get("/api/check", (req, res) => {
		res.send(req.user ? true : false)
		return;
	});

	// return all meds for current user from database
	app.get("/api/meds", (req, res) => {
		db.Med.findAll({
			where: {
				userId: req.user.id
			}
		}).then(results => {
			res.json(results);
		})
	});
	
	// put route for changing medicine's status
	app.put("/api/retire", function(req, res) {
		console.log(req.body);
		db.Med.update(req.body, {
			where: {
				userId: req.user.id,
				fdaMedId: req.body.medId
			}
		}).then(response => res.send(response));
	});
	
	//add a medicine to the database for current user
	app.post("/api/add", (req, res) => {
		db.Med.create({
			userId: req.user.id,
			brandName: req.body.brand_name,
			genericName: req.body.generic_name,
			fdaMedId: req.body.id
		}).then(() => console.log(`User ${req.user.id} has added medicine with NDC ${req.body.id} to database`))
	});

	// delete a medicine from the database for current user
	app.delete('/api/meds/:id', (req, res) => {
		db.Med.destroy({
			where: {
				fdaMedId: req.params.id
			}
		}).then((response) => {
			console.log(response)
			console.log(`User ${req.user.id} has deleted medicine with NDC ${req.params.id} from database`);
			res.sendStatus(response ? 200 : 500);
		})
	})

	//AUTH ROUTES
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
