"use strict";

const LeaveRequest = require("../models/LeaveRequest.model");

const generateLeaveRequests = () => {
    const leaveRequests = [
        {
            employeeId: 4,
            start_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                15
            ),
            end_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                17
            ),
            reason: "Family vacation",
            status: "002",
            approved_by: 1,
        },
        {
            employeeId: 5, // Jane Smith
            start_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                5
            ),
            end_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                5
            ),
            reason: "Medical appointment",
            status: "002",
            approved_by: 1,
        },
        {
            employeeId: 6, // Bob Johnson
            start_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 2,
                8
            ),
            end_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 2,
                9
            ),
            reason: "Personal matters",
            status: "002",
            approved_by: 1, // HR Manager
        },

        // Đơn xin nghỉ phép bị từ chối
        {
            employeeId: 7, // Alice Williams
            start_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                25
            ),
            end_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                29
            ),
            reason: "Vacation request",
            status: "003",
            approved_by: 1, // HR Manager
        },

        // Đơn xin nghỉ phép đang chờ duyệt
        {
            employeeId: 4, // John Doe
            start_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                10
            ),
            end_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                12
            ),
            reason: "Family event",
        },
        {
            employeeId: 9, // Diana Prince
            start_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                28
            ),
            end_date: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                28
            ),
            reason: "Doctor appointment",
        },
    ];

    return leaveRequests;
};

const seedLeaveRequests = async () => {
    try {
        await LeaveRequest.destroy({
            truncate: { cascade: true },
            restartIdentity: true,
        });
        const leaveRequests = generateLeaveRequests();
        await LeaveRequest.bulkCreate(leaveRequests);
        console.log("Leave requests seeded successfully");
    } catch (error) {
        console.error("Error seeding leave requests:", error);
    }
};

module.exports = {
    seedLeaveRequests,
};
