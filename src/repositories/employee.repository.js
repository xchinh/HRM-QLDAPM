"use strict";

const employee = require("../models/Employee.model");

class EmployeeRepository {
    static createEmployee = async ({
        userId,
        fullName,
        birthday,
        email,
        hired_at,
        position_name,
        department_id,
        base_salary,
        options = {},
    }) => {
        return employee.create(
            {
                userId,
                fullName,
                birthday,
                email,
                hired_at,
                position_name,
                department_id,
                base_salary,
                isActive: true,
            },
            options
        );
    };

    static findAllEmployee = async () => {
        return employee.findAll();
    };

    static findById = async ({ id }) => {
        return employee.findByPk(id);
    };

    static findAndUpdate = async ({
        update = {},
        attributes,
        transaction = null,
    }) => {
        return employee.update(update, {
            where: attributes,
            transaction,
            returning: true,
        });
    };

    static findOne = async ({ attributes }) => {
        return employee.findOne({
            where: attributes,
        });
    };
}

module.exports = EmployeeRepository;
