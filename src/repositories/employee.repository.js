"use strict";

const { NotFoundError } = require("../core/error.response");
const Department = require("../models/Department.model");
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
        return employee.findAll({
            attributes: ['id','fullName', 'email', 'position_name', 'isActive'],
            include: [{
                model: Department,
                attributes: ['name']
            }]
        });
    };

    static findById = async ({ id }) => {
        return employee.findByPk(id, {
            include: {
                model: Department,
                attributes: ['name']
            },
            raw: true,
        });
    };

    static findAndUpdate = async ({
        update = {},
        attributes,
        transaction = null,
    }) => {
        const existingEmployee = await employee.findOne({
            where: attributes,
            transaction,
        });

        if(!existingEmployee) {
            throw new NotFoundError("Employee not found");
        }

        const updatedEmployee = await existingEmployee.update(update, {
            transaction,
        });

        return updatedEmployee;
    };

    static findOne = async ({ attributes }) => {
        return employee.findOne({
            where: attributes,
        });
    };
}

module.exports = EmployeeRepository;
