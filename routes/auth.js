const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../config/middleware/auth");
// DB
const User = require("../models/User");

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post("/", (req, res) => {
	const { email, password } = req.body;
	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing user with the entered email
	User.findOne({ email }).then(user => {
		// look for existing user in the database
		if (!user) return res.status(400).json({ msg: "User does not exist" });
		// If user exists, validate password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
			// if password matches, get a new token
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
							email: user.email
						}
					});
				}
			);
		});
	});
});

module.exports = router;
