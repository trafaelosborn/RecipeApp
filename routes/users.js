const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../config/middleware/auth");
const User = require("../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing user with the entered email
	User.findOne({ email }).then(user => {
		// if the query was successful, there is already a user with that email
		if (user) return res.status(400).json({ msg: "User already exists" });
		// if the email is not in use, create a new user
		const newUser = new User({
			firstName,
			lastName,
			email,
			password
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then(user => {
					// create jsonwebtoken
					jwt.sign(
						{ id: user.id },
						config.get("jwtSecret"),
						// expires in one hour
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							// send token and user object to database.
							res.json({
								token,
								user: {
									id: user.id,
									firstName: user.firstName,
									lastName: user.lastName,
									email: user.email
								}
							});
						}
					);
				});
			});
		});
	});
});

// @route   GET api/users/profile/
// @desc    Get profile page
// @access  Private
router.get("/profile/", auth, (req, res) => {
	// get user id from auth 
	// if auth passes, send back the user id...
	res.send(req.params.id);
});

// @route   GET api/users/id
// @desc    Get logged in user's id
// @access  Private
router.get("/id", auth, (req, res) => {
	// get user id from auth 
	// if auth passes, send back the user id...
	res.send(req.user.id);
});

// @route   GET api/users/info/:id
// @desc    Get user data. Called on profile load to get user info.
// @access  Private
router.get("/info/:id", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then(user => res.json(user))
		.catch(err => res.status(422).json(err));
});

// @route   GET api/users/info/
// @desc    Get user data. Takes token from client and gets ID in middleware
// @access  Private
router.get("/info/", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then(user => res.json(user))
		.catch(err => res.status(422).json(err));
});

module.exports = router;
