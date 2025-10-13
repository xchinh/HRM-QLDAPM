"use strict";

const User = require("./Users.model");
const Attendance = require("./Attendance.model");
const Department = require("./Department.model");
const LeaveRequest = require("./LeaveRequest.model");
const Position = require("./Position.model");
const Employee = require("./Employee.model");

User.hasOne(Employee, {
    foreignKey: {
        name: "userId",
    },
});

Employee.belongsTo(User, {
    foreignKey: {
        name: "userId",
    },
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

Position.hasMany(Employee, {
    foreignKey: {
        name: "position_id",
    },
});

Employee.belongsTo(Position, {
    foreignKey: {
        name: "position_id",
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
