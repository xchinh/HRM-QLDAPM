"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.postgres");

const TABLE_NAME = "Position";

const position = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        base_salary: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
    },
    {
        tableName: TABLE_NAME,
    }
);

module.exports = position;
