const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
connectDB();
const errorHandler = require("./middlewares/errorHandler");
const port = process.env.PORT;
app.use(
	express.json()
);
app.use(
	"/users",
	require("./routes/userRoutes")
);
app.use(
	"/admins",
	require("./routes/adminRoutes")
);
app.use(
	errorHandler
);
app.listen(
	port,
	() => {
		console.log(`Server running on port ${port}`);
	}
);
