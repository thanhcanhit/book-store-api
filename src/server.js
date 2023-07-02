const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const router = require("./routes");

const app = express();

// .env
dotenv.config();

// Connect database
connectDB.connect();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

// HTTP logger
app.use(morgan("common"));

// Routing
router(app);

app.listen(process.env.PORT, () => {
	console.log(`Listening on http://localhost:${process.env.PORT}`);
});
