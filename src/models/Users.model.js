"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.postgres");
const { ROLE } = require("../enums");

const TABLE_NAME = "User";

const User = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                not: {
                    args: /\\s/,
                    msg: "Username must not contain spaces",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(ROLE))),
        },
    },
    {
        tableName: TABLE_NAME,
        timestamps: true,
    }
);

module.exports = User;
