"use strict";

const { seedDepartments } = require("./department.seeder");

const runSeeders = async () => {
    try {
        await seedDepartments();
        console.log("All seeds completed successful");
    } catch (error) {
        console.log("Seeding failed: ", error);
    }
};

module.exports = { runSeeders };
