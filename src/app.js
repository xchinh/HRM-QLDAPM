"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { runSeeders } = require("./seeders");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./configs/swagger.config");
const models = require("./models");
const { stack } = require("sequelize/lib/utils");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db

require("./db/init.postgres")
    .sync({ force: true })
    .then(() => {
        runSeeders();
    });

// init routes

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
        stack: error.stack,
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;
