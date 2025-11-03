"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { runSeeders } = require("./seeders");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger.config");
const models = require("./models");
const corsConfig = require("./configs/cors.config");
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// init db

require("./db/init.postgres")
    .sync()
    // .then(() => {
    //     runSeeders();
    // });

// init routes

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: { persistAuthorization: true },
  customSiteTitle: 'HRM API Docs'
}));

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
