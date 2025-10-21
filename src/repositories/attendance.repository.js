"use strict";

const { Op, Model } = require("sequelize");
const attendance = require("../models/Attendance.model");
const employee = require("../models/Employee.model");

class AttendanceRepository {
    static create = async ({
        employeeId,
        check_in,
        check_out,
        date,
        status,
        description = null,
    }) => {
        return attendance.create({
            employeeId,
            check_in,
            check_out,
            date,
            status,
            description,
        });
    };

    static findOne = async ({ queries }) => {
        return attendance.findOne({
            where: queries,
        });
    };

    static findAll = async (month, year, { queries = {}, order } = {}) => {
        const currentDate = new Date();
        const targetYear = year ? parseInt(year) : currentDate.getFullYear();
        let targetMonth = month ? parseInt(month) : currentDate.getMonth() + 1;

        if (isNaN(targetYear) || targetYear < 2000 || targetYear > 2100) {
            throw new BadRequestError(
                "Invalid year. Year must be between 2000 and 2100"
            );
        }

        if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
            throw new BadRequestError(
                "Invalid month. Month must be between 1 and 12"
            );
        }

        const startDate = new Date(targetYear, targetMonth - 1, 1);
        const endDate = new Date(targetYear, targetMonth, 0);

        const startDateStr = startDate.toISOString().split("T")[0];
        const endDateStr = endDate.toISOString().split("T")[0];
        queries = {
            ...queries,
            date: { [Op.between]: [startDateStr, endDateStr] },
        };

        const data = await attendance.findAll({
            attributes: { exclude: ["employeeId", "createdAt", "updatedAt"] },
            where: queries,
            order: order || [["date", "ASC"]],
            include: [{ model: employee, attributes: ["fullName", "id"] }],
        });
        return {
            data,
            date: {
                startDate,
                endDate,
                targetMonth,
                targetYear,
            },
        };
    };
}

module.exports = AttendanceRepository;
