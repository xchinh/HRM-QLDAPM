"use strict";

const Attendance = require("../models/Attendance.model");
const { STATUS_ATTENDANCE } = require("../enums");

// Tạo dữ liệu điểm danh cho 3 tháng gần đây cho mỗi nhân viên
const generateAttendanceData = () => {
    const attendanceRecords = [];
    const currentDate = new Date();
    const employeeIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // ID của các nhân viên

    // Tạo dữ liệu cho 3 tháng gần đây
    for (let month = 2; month >= 0; month--) {
        const year = currentDate.getFullYear();
        const targetMonth = currentDate.getMonth() - month;
        const adjustedDate = new Date(year, targetMonth, 1);
        const daysInMonth = new Date(
            adjustedDate.getFullYear(),
            adjustedDate.getMonth() + 1,
            0
        ).getDate();

        for (let employeeId of employeeIds) {
            // Bỏ qua nhân viên vô hiệu hóa (id = 8)
            if (employeeId === 8 && month < 1) continue;

            // Tạo bản ghi cho mỗi ngày làm việc trong tháng
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(
                    adjustedDate.getFullYear(),
                    adjustedDate.getMonth(),
                    day
                );
                const dayOfWeek = date.getDay(); // 0 = CN, 6 = T7

                // Bỏ qua cuối tuần
                if (dayOfWeek === 0 || dayOfWeek === 6) continue;

                // Bỏ qua các ngày trong tương lai
                if (date > currentDate) continue;

                // Tạo thông tin điểm danh ngẫu nhiên
                const random = Math.random();
                let status, check_in, check_out, description;

                if (random < 0.7) {
                    // 70% đi làm đúng giờ
                    status = STATUS_ATTENDANCE.PRESENT;
                    check_in = "08:00:00";
                    check_out = "17:00:00";
                    description = "Regular workday";
                } else if (random < 0.85) {
                    // 15% đi làm trễ
                    status = STATUS_ATTENDANCE.LATE;
                    check_in = `08:${Math.floor(Math.random() * 45) + 15}:00`;
                    check_out = "17:00:00";
                    description = "Late arrival";
                } else if (random < 0.9) {
                    // 5% xin nghỉ phép
                    status = STATUS_ATTENDANCE.LEAVE;
                    check_in = null;
                    check_out = null;
                    description = "Approved leave";
                } else {
                    // 10% vắng mặt
                    status = STATUS_ATTENDANCE.ABSENT;
                    check_in = null;
                    check_out = null;
                    description = "Absence without notice";
                }

                // Format date to YYYY-MM-DD
                const formattedDate = date.toISOString().split("T")[0];

                attendanceRecords.push({
                    employeeId,
                    date: formattedDate,
                    check_in,
                    check_out,
                    status,
                    description,
                });
            }
        }
    }

    return attendanceRecords;
};

const seedAttendance = async () => {
    try {
        await Attendance.destroy({
            truncate: { cascade: true },
            restartIdentity: true,
        });
        const attendanceData = generateAttendanceData();
        await Attendance.bulkCreate(attendanceData);
        console.log(
            `Attendance records seeded successfully: ${attendanceData.length} records created`
        );
    } catch (error) {
        console.error("Error seeding attendance records:", error);
    }
};

module.exports = {
    seedAttendance,
};
