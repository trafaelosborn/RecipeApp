const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const app = express();
const port = process.env.PORT || 3001;

// Body Parser middleware
app.use(express.json());

// DB config
//const db = config.get("mongoURI");

// connect to DB
/* mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("mongodb connected"))
	.catch(err => console.log(err)); */
	if (process.env.NODE_ENV === 'production') {
		// Exprees will serve up production assets
		app.use(express.static('client/build'));
	  
		// Express serve up index.html file if it doesn't recognize route
		const path = require('path');
		app.get('*', (req, res) => {
		  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
		});
	  }
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipedb");

// use routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipes"));

// Server static assets if we're in production


app.listen(port, () => console.log(`Server started on port ${port}`));
