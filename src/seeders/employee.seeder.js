"use strict";

const Employee = require("../models/Employee.model");

const employees = [
    {
        userId: 1,
        fullName: "Admin",
        email: "admin@example.com",
        hired_at: "2018-03-10",
        department_id: 1, // HR
        position_name: "HR Manager",
        base_salary: 10000,
        isActive: true,
    },
    {
        userId: 2,
        fullName: "Sarah Johnson",
        email: "hr_manager@example.com",
        birthday: "1985-05-15",
        hired_at: "2018-03-10",
        department_id: 1, // HR
        position_name: "HR Manager",
        base_salary: 7000,
        isActive: true,
    },
    {
        userId: 3,
        fullName: "Michael Chen",
        email: "it_manager@example.com",
        birthday: "1980-11-23",
        hired_at: "2017-01-05",
        department_id: 2, // IT
        position_name: "IT Manager",
        base_salary: 8000,
        isActive: true,
    },
    {
        userId: 4,
        fullName: "Emma Rodriguez",
        email: "finance_manager@example.com",
        birthday: "1982-09-08",
        hired_at: "2019-04-18",
        department_id: 3, // Finance
        position_name: "Finance Manager",
        base_salary: 7500,
        isActive: true,
    },
    {
        userId: 5,
        fullName: "John Doe",
        email: "john.doe@example.com",
        birthday: "1990-02-15",
        hired_at: "2021-06-01",
        department_id: 2, // IT
        position_name: "Senior Developer",
        base_salary: 6000,
        isActive: true,
    },
    {
        userId: 6,
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        birthday: "1992-07-22",
        hired_at: "2022-01-15",
        department_id: 4, // Marketing
        position_name: "Marketing Specialist",
        base_salary: 4500,
        isActive: true,
    },
    {
        userId: 7,
        fullName: "Bob Johnson",
        email: "bob.johnson@example.com",
        birthday: "1988-12-03",
        hired_at: "2020-11-10",
        department_id: 3, // Finance
        position_name: "Accountant",
        base_salary: 5200,
        isActive: true,
    },
    {
        userId: 8,
        fullName: "Alice Williams",
        email: "alice.williams@example.com",
        birthday: "1993-04-30",
        hired_at: "2021-09-15",
        department_id: 1, // HR
        position_name: "HR Specialist",
        base_salary: 4800,
        isActive: true,
    },
    {
        userId: 9,
        fullName: "Charlie Brown",
        email: "charlie.brown@example.com",
        birthday: "1991-08-17",
        hired_at: "2020-03-02",
        department_id: 5, // Operations
        position_name: "Operations Analyst",
        base_salary: 5000,
        isActive: false, // Disabled employee
    },
    {
        userId: 10,
        fullName: "Diana Prince",
        email: "diana.prince@example.com",
        birthday: "1989-06-12",
        hired_at: "2022-02-28",
        department_id: 2, // IT
        position_name: "QA Engineer",
        base_salary: 5500,
        isActive: true,
    },
];

const seedEmployees = async () => {
    try {
        await Employee.destroy({
            truncate: { cascade: true },
            restartIdentity: true,
        });
        await Employee.bulkCreate(employees);
        console.log("Employees seeded successfully");
    } catch (error) {
        console.error("Error seeding employees:", error);
    }
};

module.exports = {
    seedEmployees,
};
