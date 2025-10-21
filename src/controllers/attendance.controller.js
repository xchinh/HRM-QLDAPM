"use strict";

const { CREATED, OK } = require("../core/success.response");
const AttendanceService = require("../services/attendance/attendance.service");

class AttendanceController {
    static create = async (req, res, next) => {
        new CREATED({
            message: "Attendance record created successful",
            metadata: await AttendanceService.create(req.params.id, req.body),
        }).send(res);
    };

    static getAllById = async (req, res, next) => {
        new OK({
            message: "Get all attendance record of Employee successful",
            metadata: await AttendanceService.getAllById(
                req.params.id,
                req.query
            ),
        }).send(res);
    };

    static getAll = async (req, res, next) => {
        new OK({
            message: "Get all attendance record successful",
            metadata: await AttendanceService.getAll(req.query),
        }).send(res);
    };
}

module.exports = AttendanceController;
