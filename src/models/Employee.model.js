"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.postgres");

const TABLE_NAME = "Employee";

const employee = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: DataTypes.STRING,
        birthday: DataTypes.DATE,
        gender: { type: DataTypes.ENUM("Male", "Female") },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        address: DataTypes.TEXT,
        hired_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        position_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        base_salary: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        isActive: DataTypes.BOOLEAN,
        allowance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        bonus: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        deduction: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        dependents: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: TABLE_NAME,
    }
);

module.exports = employee;
