"use strict";

const department = require("../models/Department.model");

const departments = [
    {
        id: 1,
        name: "Human Resources",
        description: "Manages employee relations and recruitment",
    },
    {
        id: 2,
        name: "Information Technology",
        description: "Handles all IT infrastructure and development",
    },
    {
        id: 3,
        name: "Finance",
        description: "Manages company finances and accounting",
    },
    {
        id: 4,
        name: "Marketing",
        description: "Handles company marketing and advertising",
    },
    {
        id: 5,
        name: "Operations",
        description: "Manages day-to-day business operations",
    },
];

const seedDepartments = async () => {
    try {
        await department.bulkCreate(departments, {
            force: true,
        });
        console.log("Departments seeded successfully");
    } catch (error) {
        console.error("Error seeding departments:", error);
    }
};

module.exports = {
    seedDepartments,
};
