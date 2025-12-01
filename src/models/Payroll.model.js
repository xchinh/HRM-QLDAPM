"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.postgres");
const { STATUS_PAYROLL } = require("../enums");

const TABLE_NAME = "Payroll";

const payroll = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "employee_id",
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 12 },
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        base_salary: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        allowance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        bonus: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },

        // Ngày công
        standard_working_days: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_working_days: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },

        // Lương theo ngày công
        salary_by_days: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },

        // Bảo hiểm
        social_insurance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        health_insurance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        unemployment_insurance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        total_insurance: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },

        // Thuế
        taxable_income: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },
        personal_income_tax: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },

        // Các khoản khấu trừ khác
        other_deductions: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
        },

        // Tổng kết
        gross_salary: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        total_deductions: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        net_salary: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM,
            values: Object.values(STATUS_PAYROLL),
            defaultValue: STATUS_PAYROLL.DRAFT,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: TABLE_NAME,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["employee_id", "month", "year"],
                name: "unique_employee_month_year",
            },
        ],
    }
);

module.exports = payroll;
