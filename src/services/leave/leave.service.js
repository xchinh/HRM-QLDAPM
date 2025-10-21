"use strict";

const { BadRequestError, NotFoundError } = require("../../core/error.response");
const { ROLE, STATUS_LEAVE } = require("../../enums");
const EmployeeRepository = require("../../repositories/employee.repository");
const LeaveRepository = require("../../repositories/leaveRequest.repository");
const UserRepository = require("../../repositories/user.repository");
const { getDataInfo, omitDataInfo } = require("../../utils");

class LeaveService {
    static getAll = async ({ status = null }) => {
        const data = await LeaveRepository.getAll({
            queries: {
                ...(status && { status }),
            },
        });

        return {
            data: omitDataInfo({
                object: data,
                field: ["createdAt", "updatedAt"],
            }),
        };
    };

    static getAllById = async (id, { status = null }) => {
        if (!id) {
            throw new BadRequestError("User Id is required");
        }

        const user = await UserRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (!user?.employee) {
            throw new BadRequestError(
                "User does not have employee information"
            );
        }

        const data = await LeaveRepository.getAll({
            queries: {
                ...(status && {
                    employeeId: user.employee.id,
                    status,
                }),
            },
        });

        return {
            data: omitDataInfo({
                object: data,
                field: ["createdAt", "updatedAt"],
            }),
        };
    };

    static create = async (
        employeeId,
        { reason = null, start_date, end_date }
    ) => {
        if (!employeeId) {
            throw new BadRequestError("Employee Id is required");
        }

        const employee = await EmployeeRepository.findById({ id: employeeId });
        if (!employee) {
            throw new NotFoundError("Employee not found");
        }

        if (employee.isActive === false) {
            throw new BadRequestError(
                "Inactive employee cannot create leave request"
            );
        }

        if (!start_date || !end_date) {
            throw new BadRequestError("Invalid request");
        }

        const formattedStartDate = new Date(start_date);
        const formattedEndDate = new Date(end_date);

        if (isNaN(formattedStartDate) || isNaN(formattedEndDate)) {
            throw new BadRequestError("Invalid date formate");
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (formattedStartDate < currentDate) {
            throw new BadRequestError(
                "Cannot create leave request for past dates"
            );
        }

        const isExistingLeave = await LeaveRepository.isExistingLeave({
            employeeId,
            formattedStartDate,
            formattedEndDate,
        });

        if (isExistingLeave) {
            throw new BadRequestError(
                "A Leave request already exists for this period"
            );
        }

        const newLeave = await LeaveRepository.create({
            employeeId,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            reason,
        });

        return {
            data: {
                leave: getDataInfo({
                    object: newLeave,
                    field: [
                        "id",
                        "employeeId",
                        "start_date",
                        "end_date",
                        "status",
                        "createdAt",
                    ],
                }),
            },
        };
    };

    static approveLeave = async (id, userId) => {
        if (!id || !userId) {
            throw new BadRequestError("Invalid request");
        }

        const leave = await LeaveRepository.findOneAndPending({
            queries: {
                id,
                status: STATUS_LEAVE.PENDING,
            },
        });
        if (!leave) {
            throw new NotFoundError("Leave not found");
        }

        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (!user?.employee) {
            throw new BadRequestError(
                "User does not have employee information"
            );
        }

        const updatedLeave = await LeaveRepository.update({
            updatedData: {
                status: STATUS_LEAVE.APPROVED,
                approved_by: user.employee.id,
            },
            queries: {
                id,
            },
        });

        console.log(updatedLeave);

        return {
            data: {
                leave: getDataInfo({
                    object: updatedLeave,
                    field: ["id", "status", "approved_by", "updatedAt"],
                }),
            },
        };
    };

    static rejectLeave = async (id, userId) => {
        if (!id || !userId) {
            throw new BadRequestError("Invalid request");
        }

        const leave = await LeaveRepository.findOneAndPending({
            queries: {
                id,
                status: STATUS_LEAVE.PENDING,
            },
        });
        if (!leave) {
            throw new NotFoundError("Leave not found");
        }

        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (!user?.employee) {
            throw new BadRequestError(
                "User does not have employee information"
            );
        }

        const updatedLeave = await LeaveRepository.update({
            updateData: {
                status: STATUS_LEAVE.REJECTED,
                approved_by: user.employee.id,
            },
            queries: {
                id,
            },
        });

        return {
            data: {
                leave: getDataInfo({
                    object: updatedLeave,
                    field: ["id", "status", "approved_by", "updatedAt"],
                }),
            },
        };
    };
}

module.exports = LeaveService;
