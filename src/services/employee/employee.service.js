"use strict";
const { BadRequestError, NotFoundError } = require("../../core/error.response");
const sequelize = require("../../db/init.postgres");
const EmployeeRepository = require("../../repositories/employee.repository");
const UserRepository = require("../../repositories/user.repository");
const bcrypt = require("bcrypt");
const { getDataInfo } = require("../../utils");

class EmployeeService {
    static create = async ({
        fullName,
        birthday,
        email,
        hired_at,
        department_id,
        position_name,
        base_salary,
    }) => {
        if (
            !fullName ||
            !email ||
            !department_id ||
            !position_name ||
            !base_salary
        ) {
            throw new BadRequestError("Missing required fields");
        }

        if (base_salary <= 0) {
            throw new BadRequestError("Base salary must be greater than 0");
        }

        const role = position_name.toLowerCase().includes("manager")
            ? "0002"
            : "0004";
        const password = await bcrypt.hash("password123", 10);
        const result = await sequelize.transaction(async (t) => {
            const user = await UserRepository.create({
                username: email,
                password,
                role: [role],
                options: {
                    transaction: t,
                },
            });

            const employee = await EmployeeRepository.createEmployee({
                userId: user.id,
                fullName,
                birthday: birthday ? new Date(birthday) : null,
                email,
                hired_at: hired_at ? new Date(hired_at) : new Date(),
                department_id,
                position_name,
                base_salary,
                options: {
                    transaction: t,
                },
            });

            return { user, employee };
        });

        return {
            data: {
                employee: getDataInfo({
                    object: result.employee,
                    field: [
                        "id",
                        "fullName",
                        "email",
                        "position_name",
                        "department_id",
                    ],
                }),
            },
        };
    };

    static getAll = async () => {
        const employees = await EmployeeRepository.findAllEmployee();
        return {
            data: employees ? employees : {},
        };
    };

    static update = async (
        id,
        { fullName, email, department_id, position_name, base_salary }
    ) => {
        if (!id) {
            throw new BadRequestError("Employee Id is required");
        }

        const employee = await EmployeeRepository.findById({ id });
        if (!employee) {
            throw new NotFoundError("Employee not found");
        }

        const updateData = {};

        if (fullName) updateData.fullName = fullName;
        if (email) updateData.email = email;
        if (department_id) updateData.department_id = department_id;
        if (position_name) updateData.position_name = position_name;
        if (base_salary) {
            if (base_salary <= 0) {
                throw new BadRequestError("Base salary must be greater than 0");
            }
            updateData.base_salary = base_salary;
        }

        if (position_name && position_name !== employee.position_name) {
            return await sequelize.transaction(async (t) => {
                const updatedEmployee = await employee.update(updateData, {
                    transaction: t,
                });

                const newRole =
                    position_name.toLowerCase() === "manager" ? "0002" : "0004";
                await UserRepository.findAndUpdate({
                    updateData: { role: newRole },
                    attributes: { id: employee.userId },
                    transaction: t,
                });
                return {
                    data: getDataInfo({
                        object: updatedEmployee,
                        field: [
                            "id",
                            "fullName",
                            "email",
                            "position_name",
                            "department_id",
                            "base_salary",
                        ],
                    }),
                };
            });
        }

        const updatedEmployee = await employee.update(updateData);
        return {
            data: getDataInfo({
                object: updatedEmployee,
                field: [
                    "id",
                    "fullName",
                    "email",
                    "position_name",
                    "department_id",
                    "base_salary",
                ],
            }),
        };
    };

    static disableEmployee = async ({ id }) => {
        if (!id) {
            throw new BadRequestError("Employee Id is required");
        }

        const updatedEmployee = await EmployeeRepository.findAndUpdate({
            update: {
                isActive: false,
            },
            attributes: { id },
        });

        return {
            data: getDataInfo({
                object: updatedEmployee,
                field: ["id", "fullName", "isActive"],
            }),
        };
    };

    static enableEmployee = async ({ id }) => {
        if (!id) {
            throw new BadRequestError("Employee Id is required");
        }

        const updatedEmployee = await EmployeeRepository.findAndUpdate({
            update: {
                isActive: false,
            },
            attributes: { id },
        });

        return {
            data: getDataInfo({
                object: updatedEmployee,
                field: ["id", "fullName", "isActive"],
            }),
        };
    };
}

module.exports = EmployeeService;
