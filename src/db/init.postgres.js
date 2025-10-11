"use strict";

const { Sequelize } = require("sequelize");
const config = require("../configs/db.config");

class Database {
    sequelize;
    constructor() {
        this.sequelize = null;
        this.connect();
    }

    async connect() {
        try {
            this.sequelize = new Sequelize(
                config.database,
                config.username,
                config.password,
                {
                    host: config.host,
                    port: config.port,
                    dialect: config.dialect,
                    pool: {
                        max: config.pool.max,
                        min: config.pool.min,
                        acquire: config.pool.acquire,
                        idle: config.pool.idle,
                    },
                }
            );
            await this.sequelize.authenticate();
            console.log("Database connected successfully.");
        } catch (error) {
            console.log("Database connection error:", error);
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
            return Database.instance;
        }
    }
}

const instanceDb = Database.getInstance();
module.exports = instanceDb.sequelize;
