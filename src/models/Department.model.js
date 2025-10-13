"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.postgres");

const TABLE_NAME = "Department";

const department = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
    },
    {
        tableName: TABLE_NAME,
    }
);

module.exports = department;
