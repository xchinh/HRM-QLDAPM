"use strict";

const User = require("./Users.model");
const Attendance = require("./Attendance.model");
const Department = require("./Department.model");
const LeaveRequest = require("./LeaveRequest.model");
const Employee = require("./Employee.model");

User.hasOne(Employee, {
    foreignKey: {
        name: "userId",
    },
    as: "employee",
});

Employee.belongsTo(User, {
    foreignKey: {
        name: "userId",
    },
    as: "user",
});

Employee.hasMany(Attendance, {
    foreignKey: {
        name: "employeeId",
    },
});

Attendance.belongsTo(Employee, {
    foreignKey: {
        name: "employeeId",
    },
});

Employee.hasMany(LeaveRequest, {
    foreignKey: {
        name: "employeeId",
    },
});

LeaveRequest.belongsTo(Employee, {
    foreignKey: {
        name: "employeeId",
    },
});

Employee.hasOne(LeaveRequest, {
    foreignKey: {
        name: "approved_by",
        allowNull: true,
    },
});

LeaveRequest.belongsTo(Employee, {
    foreignKey: {
        name: "approved_by",
        allowNull: true,
    },
});

Department.hasMany(Employee, {
    foreignKey: {
        name: "department_id",
    },
});

Employee.belongsTo(Department, {
    foreignKey: {
        name: "department_id",
    },
});

module.exports = {
    User,
    Attendance,
    Department,
    LeaveRequest,
    Employee,
};
