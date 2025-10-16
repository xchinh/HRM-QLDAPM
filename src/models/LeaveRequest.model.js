"use strict";

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/init.postgres");
const { STATUS_LEAVE } = require("../enums");

const TABLE_NAME = "Leave_Request";

const LeaveRequest = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        reason: DataTypes.TEXT,
        status: {
            type: DataTypes.ENUM,
            values: Object.values(STATUS_LEAVE),
            default: STATUS_LEAVE.PENDING,
        },
    },
    {
        tableName: TABLE_NAME,
    }
);

module.exports = LeaveRequest;
