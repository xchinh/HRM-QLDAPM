"use strict";

const { BadRequestError, NotFoundError, UnauthorizedError } = require("../../core/error.response");
const {  STATUS_LEAVE } = require("../../enums");
const EmployeeRepository = require("../../repositories/employee.repository");
const LeaveRepository = require("../../repositories/leaveRequest.repository");
const UserRepository = require("../../repositories/user.repository");
const { getDataInfo, omitDataInfo } = require("../../utils");

class LeaveService {
    static getAll = async ({ status = null }) => {
        const leaves = await LeaveRepository.getAll({
            queries: {
                where: {
                    ...(status && {status})
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
        });

        return {
            data: leaves
        };
    };

    static getAllByEmployee = async (employeeId, { status = null }) => {
        if (!employeeId) {
            throw new BadRequestError("Employee Id is required");
        }

        const employee = await EmployeeRepository.findOne({
            attributes: {
                id: employeeId
            }
        })

        if(!employee) {
            throw new NotFoundError("Employee not found");
        }

        const leaves = await LeaveRepository.getAll({
            queries: {
                where: {
                    employeeId: employeeId,
                    ...(status && {status})
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
        });

        return {
            data: leaves
        };
    };

    static create = async (
        id,
        { reason = null, start_date, end_date }
    ) => {

        const employee = await EmployeeRepository.findById({ id });
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
            employeeId: employee.id,
            formattedStartDate,
            formattedEndDate,
        });

        if (isExistingLeave) {
            throw new BadRequestError(
                "A Leave request already exists for this period"
            );
        }

        const newLeave = await LeaveRepository.create({
            employeeId: employee.id,
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

        const employee = await EmployeeRepository.findOne({
            attributes: {
                userId
            }
        })

        if(!employee) {
            throw new NotFoundError("Employee not found");
        }

        const updatedLeave = await LeaveRepository.update({
            updatedData: {
                status: STATUS_LEAVE.APPROVED,
                approved_by: employee.id,
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

        const employee = await EmployeeRepository.findOne({
            attributes: {
                userId
            }
        })

        if(!employee) {
            throw new NotFoundError("Employee not found");
        }

        const updatedLeave = await LeaveRepository.update({
            updatedData: {
                status: STATUS_LEAVE.REJECTED,
                approved_by: employee.id,
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

    static delete = async (id, userId) => {
        if(!id || !userId) {
            throw new BadRequestError("Invalid request");
        }

        const employee = await EmployeeRepository.findOne({
            attributes: {
                userId
            }
        });

        if(!employee) {
            throw new NotFoundError("Employee not found");
        }

        const isPending = await LeaveRepository.isPending({
            attributes: {
                id,
                employeeId: employee.id,
                status: STATUS_LEAVE.PENDING
            }
        })
        
        if(!isPending) {
            throw new BadRequestError("Leave is not pending");
        }

        await LeaveRepository.delete({
            id
        })
        return true;
    }
}

module.exports = LeaveService;
