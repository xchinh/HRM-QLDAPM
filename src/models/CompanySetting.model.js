"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.postgres");

const TABLE_NAME = "CompanySettings";
const companySettings = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        standard_working_days: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 26,
        },
        social_insurance_rate: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: false,
            defaultValue: 0.08,
        },
        health_insurance_rate: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: false,
            defaultValue: 0.015,
        },
        unemployment_insurance_rate: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: false,
            defaultValue: 0.01,
        },
        tax_exemption: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 11000000,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: TABLE_NAME,
        timestamps: true,
    }
);

module.exports = companySettings;
