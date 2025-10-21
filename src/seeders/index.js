"use strict";

const { seedDepartments } = require("./department.seeder");
const { seedUsers } = require("./user.seeder");
const { seedEmployees } = require("./employee.seeder");
const { seedAttendance } = require("./attendance.seeder");
const { seedLeaveRequests } = require("./leave.seeder");
const sequelize = require("../db/init.postgres");

const runSeeders = async () => {
    try {
        console.log("Starting database seeding...");

        await seedDepartments();
        await seedUsers();
        await seedEmployees();
        await seedAttendance();
        await seedLeaveRequests();

        console.log("Database seeding completed successfully!");
    } catch (error) {
        console.error("Seeding failed:", error);
    }
};

module.exports = {
    runSeeders,
};
