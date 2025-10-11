"use strict";

const dev = {
    username: process.env.DB_DEV_USERNAME || "postgres",
    password: process.env.DB_DEV_PASSWORD || "password",
    database: process.env.DB_DEV_DATABASE || "HRM_DEV",
    host: process.env.DB_DEV_HOST || "localhost",
    port: process.env.DB_DEV_PORT || 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

const prod = {
    username: process.env.DB_PROD_USERNAME || "postgres",
    password: process.env.DB_PROD_PASSWORD || "password",
    database: process.env.DB_PROD_DATABASE || "HRM_PROD",
    host: process.env.DB_PROD_HOST || "localhost",
    port: process.env.DB_PROD_PORT || 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
