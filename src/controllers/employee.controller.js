"use strict";

const { CREATED, OK } = require("../core/success.response");
const EmployeeService = require("../services/employee/employee.service");

class EmployeeController {
    static create = async (req, res, next) => {
        new CREATED({
            message: "Create Employee successful",
            metadata: await EmployeeService.create(req.body),
        }).send(res);
    };

    static getAll = async (req, res, next) => {
        new OK({
            message: "Find all employee successful",
            metadata: await EmployeeService.getAll(),
        }).send(res);
    };

    static update = async (req, res, next) => {
        new OK({
            message: "Update Employee successful",
            metadata: await EmployeeService.update(req.body),
        }).send(res);
    };

    static disable = async (req, res, next) => {
        new OK({
            message: "Disable Employee successful",
            metadata: await EmployeeService.disableEmployee(req.body),
        }).send(res);
    };
}

module.exports = EmployeeController;
