"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
require("./db/init.postgres").sync();
// init routes
app.use("/api/v1", require("./routes"));
// handle errors

module.exports = app;
