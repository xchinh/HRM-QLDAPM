"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { asyncHandler } = require("./helpers/asyncHandler");
const { runSeeders } = require("./seeders");
const models = require("./models");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
asyncHandler(require("./db/init.postgres").sync());
// asyncHandler(runSeeders());
// init routes
app.use("/", require("./routes"));
// handle errors

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;
