"use strict";

const { Op } = require("sequelize");
const { BadRequestError, NotFoundError } = require("../../core/error.response");
const { STATUS_ATTENDANCE } = require("../../enums");
const AttendanceRepository = require("../../repositories/attendance.repository");
const EmployeeRepository = require("../../repositories/employee.repository");
const LeaveRepository = require("../../repositories/leaveRequest.repository");

class AttendanceService {
    static create = async (id, { date, check_in, check_out, description }) => {
        if (!id) {
            throw new BadRequestError("Employee Id is required");
        }

        if (!date) {
            throw new BadRequestError("Date is required");
        }

        const employee = await EmployeeRepository.findById({ id });
        if (!employee) {
            throw new NotFoundError("Employee not found");
        }

        const formattedDate = new Date(date).toISOString().split("T")[0];

        const existingAttendance = await AttendanceRepository.findOne({
            queries: {
                employeeId: id,
                date: formattedDate,
            },
        });

        if (existingAttendance) {
            throw new BadRequestError(
                `Attendance record already exist for ${formattedDate}`
            );
        }

        const isLeave = await LeaveRepository.hasApprovedLeave({
            employeeId: id,
            date: new Date(date),
        });

        let status;
        if (isLeave) {
            status = STATUS_ATTENDANCE.LEAVE;
        } else if (!check_in && !check_out) {
            status = STATUS_ATTENDANCE.ABSENT;
        } else {
            const WORK_START = new Date(`${formattedDate}T08:00:00`);
            const checkInTime = check_in
                ? new Date(`${formattedDate}T${check_in}`)
                : null;

            status = !checkInTime
                ? STATUS_ATTENDANCE.LATE
                : checkInTime > WORK_START
                ? STATUS_ATTENDANCE.LATE
                : STATUS_ATTENDANCE.PRESENT;
        }

        const attendance = await AttendanceRepository.create({
            employeeId: id,
            check_in,
            check_out,
            status,
            date: formattedDate,
            description,
        });

        return {
            data: {
                attendance,
            },
        };
    };

    static getAllById = async (id, { month, year }) => {
        if (!id) {
            throw new BadRequestError("Employee Id is required");
        }

        const employee = await EmployeeRepository.findById({ id });
        if (!employee) {
            throw new NotFoundError("Employee not found");
        }

        const {
            data,
            date: { startDate, endDate, targetMonth, targetYear },
        } = await AttendanceRepository.findAll(month, year, {
            queries: {
                employeeId: id,
            },
            order: [["date", "ASC"]],
        });

        const stats = {
            total: data.length,
            present: data.filter((r) => r.status === STATUS_ATTENDANCE.PRESENT)
                .length,
            late: data.filter((r) => r.status === STATUS_ATTENDANCE.LATE)
                .length,
            absent: data.filter((r) => r.status === STATUS_ATTENDANCE.ABSENT)
                .length,
            leave: data.filter((r) => r.status === STATUS_ATTENDANCE.LEAVE)
                .length,
        };

        const daysInMonth = endDate.getDate();

        let workDays = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(targetYear, targetMonth - 1, day);
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0) {
                workDays++;
            }
        }

        stats.workDays = workDays;
        return {
            data: {
                period: {
                    month: targetMonth,
                    year: targetYear,
                },
                stats,
                records: data,
            },
        };
    };

    static getAll = async ({ month, year }) => {
        const {
            data,
            date: { endDate, targetMonth, targetYear },
        } = await AttendanceRepository.findAll(month, year, {
            order: [
                ["employeeId", "ASC"],
                ["date", "ASC"],
            ],
        });

        const globalStats = {
            total: data.length,
            present: data.filter((r) => r.status === STATUS_ATTENDANCE.PRESENT)
                .length,
            late: data.filter((r) => r.status === STATUS_ATTENDANCE.LATE)
                .length,
            absent: data.filter((r) => r.status === STATUS_ATTENDANCE.ABSENT)
                .length,
            leave: data.filter((r) => r.status === STATUS_ATTENDANCE.LEAVE)
                .length,
        };

        const daysInMonth = endDate.getDate();
        let workDays = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(targetYear, targetMonth - 1, day);
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0) {
                workDays++;
            }
        }
        globalStats.workDays = workDays;

        return {
            data: {
                period: {
                    month: targetMonth,
                    year: targetYear,
                },
                globalStats,
                data,
            },
        };
    };
}

module.exports = AttendanceService;
