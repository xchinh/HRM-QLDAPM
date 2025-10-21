"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.postgres");
const { STATUS_ATTENDANCE } = require("../enums");

const TABLE_NAME = "Attendance";

const attendance = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_in: DataTypes.TIME,
        check_out: DataTypes.TIME,
        status: {
            type: DataTypes.ENUM,
            values: Object.values(STATUS_ATTENDANCE),
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: TABLE_NAME,
    }
);

module.exports = attendance;
