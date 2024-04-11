const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router/route");
const cookieParser = require("cookie-parser");
const { default: rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const { MAX_API_REQUEST_PER_IP_FOR_MINUTE } = require("./config");

require("dotenv").config();

const app = express();

// Use Helmet!
app.use(helmet());

// Rate limit
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, //1 min
	max: MAX_API_REQUEST_PER_IP_FOR_MINUTE || 100,
});

// Middlewares
app.use(express.json());
// app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(limiter);

// API Router

app.get("/", (req, res) => {
	res.send({ hello: "hello" });
});

app.use("/api/v1", router);

app.all("*", (req, res, next) => {
	const error = new Error(`can't find ${req.originalUrl} on the server`);
	error.status = "fail";
	error.statusCode = 404;
	next(error);
});

// Error Handle Middleware

app.use((error, req, res, next) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";
	res.status(error.statusCode).json({
		status: error.status,
		message: error.message,
	});
});

module.exports = app;
