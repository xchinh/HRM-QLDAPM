"use strict";

const payroll = require("../models/Payroll.model");
const Employee = require("../models/Employee.model");

class PayrollRepository {
    static findOrCreate = async ({ queries = {}, defaults }) => {
        return payroll.findOrCreate({
            where: queries,
            defaults,
        });
    };

    static findAll = async (month, year, order) => {
        return payroll.findAll({
            where: {
                month,
                year,
            },
            include: [
                {
                    model: Employee,
                    attributes: ["fullName", "email", "position_name"],
                },
            ],
            order: order ?? [["employee_id", "ASC"]],
        });
    };

    static findOne = async ({ queries = {} }) => {
        return payroll.findOne({
            where: queries,
            include: [
                {
                    model: Employee,
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "position_name",
                        "base_salary",
                    ],
                },
            ],
        });
    };
}

module.exports = PayrollRepository;
