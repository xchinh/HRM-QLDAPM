"use strict";

const { Op } = require("sequelize");
const { STATUS_LEAVE } = require("../enums");
const LeaveRequest = require("../models/LeaveRequest.model");
const { BadRequestError } = require("../core/error.response");

class LeaveRepository {
    static hasApprovedLeave = async ({ employeeId, date }) => {
        const leave = await LeaveRequest.findOne({
            where: {
                employeeId,
                status: STATUS_LEAVE.APPROVED,
                start_date: { [Op.lte]: date },
                end_date: { [Op.gte]: date },
            },
        });

        return !!leave;
    };

    static isExistingLeave = async ({
        employeeId,
        formattedStartDate,
        formattedEndDate,
    }) => {
        const leave = await LeaveRequest.findOne({
            where: {
                employeeId,
                status: { [Op.ne]: STATUS_LEAVE.REJECTED },
                [Op.or]: [
                    {
                        start_date: { [Op.lte]: formattedStartDate },
                        end_date: { [Op.gte]: formattedStartDate },
                    },
                    {
                        start_date: { [Op.lte]: formattedEndDate },
                        end_date: { [Op.gte]: formattedEndDate },
                    },
                    {
                        start_date: { [Op.gte]: formattedStartDate },
                        end_date: { [Op.lte]: formattedEndDate },
                    },
                ],
            },
        });

        return !!leave;
    };

    static create = async ({ employeeId, start_date, end_date, reason }) => {
        return LeaveRequest.create({
            employeeId,
            start_date,
            end_date,
            reason,
        });
    };

    static findOneAndPending = async ({ queries }) => {
        return LeaveRequest.findOne({
            where: queries,
        });
    };

    static update = async ({ updatedData = {}, queries = {} }) => {
        const [count, [updatedLeave]] = await LeaveRequest.update(updatedData, {
            where: queries,
            returning: true,
        });

        if (count === 0) return null;
        return updatedLeave;
    };

    static getAll = async ({ queries }) => {
        return LeaveRequest.findAll({
            ...queries,
            raw: true,
        });
    };

    static isPending = async({ attributes = {}}) => {
        const leave = LeaveRequest.findOne({
            where: attributes
        })

        return !!leave;
    }

    static delete = async (id) => {
        return LeaveRequest.destroy({
            where: {
                id
            }
        });;
    }
}

module.exports = LeaveRepository;
