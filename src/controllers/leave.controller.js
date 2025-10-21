"use strict";

const { OK, CREATED } = require("../core/success.response");
const LeaveService = require("../services/leave/leave.service");

class LeaveController {
    static getAll = async (req, res, next) => {
        new OK({
            message: "Get all Leave Request successful",
            metadata: await LeaveService.getAll(req.query),
        }).send(res);
    };

    static getAllById = async (req, res, next) => {
        new OK({
            message: "Get all Leave of Employee successful",
            metadata: await LeaveService.getAllById(req.user.userId, req.query),
        }).send(res);
    };

    static create = async (req, res, next) => {
        new CREATED({
            message: "Create Leave request successful",
            metadata: await LeaveService.create(req.user.employeeId, req.body),
        }).send(res);
    };

    static approveLeave = async (req, res, next) => {
        new OK({
            message: "Approve leave successful",
            metadata: await LeaveService.approveLeave(
                req.params.id,
                req.user.userId
            ),
        }).send(res);
    };

    static rejectLeave = async (req, res, next) => {
        new OK({
            message: "Reject leave successful",
            metadata: await LeaveService.rejectLeave(
                req.params.id,
                req.user.userId
            ),
        }).send(res);
    };
}

module.exports = LeaveController;
