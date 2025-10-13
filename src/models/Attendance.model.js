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
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_in: DataTypes.TIME,
        check_out: DataTypes.TIME,
        status: {
            type: DataTypes.ENUM,
            values: STATUS_ATTENDANCE,
        },
    },
    {
        tableName: TABLE_NAME,
    }
);

module.exports = attendance;
