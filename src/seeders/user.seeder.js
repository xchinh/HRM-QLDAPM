"use strict";

const User = require("../models/Users.model");
const bcrypt = require("bcrypt");

const createUsers = async () => {
    const password = await bcrypt.hash("password123", 10);

    return [
        {
            id: 1,
            username: "admin@example.com",
            password,
            role: ["0001", "0003"],
        },
        {
            id: 2,
            username: "hr_manager@example.com",
            password,
            role: ["0002"],
        },
        {
            id: 3,
            username: "it_manager@example.com",
            password,
            role: ["0002"],
        },
        {
            id: 4,
            username: "finance_manager@example.com",
            password,
            role: ["0002"],
        },
        {
            id: 5,
            username: "john.doe@example.com",
            password,
            role: ["0004"],
        },
        {
            id: 6,
            username: "jane.smith@example.com",
            password,
            role: ["0004"],
        },
        {
            id: 7,
            username: "bob.johnson@example.com",
            password,
            role: ["0004"],
        },
        {
            id: 8,
            username: "alice.williams@example.com",
            password,
            role: ["0004"],
        },
        {
            id: 9,
            username: "charlie.brown@example.com",
            password,
            role: ["0004"],
        },
        {
            id: 10,
            username: "diana.prince@example.com",
            password,
            role: ["0004"],
        },
    ];
};

const seedUsers = async () => {
    try {
        await User.destroy({
            truncate: { cascade: true },
            restartIdentity: true,
        });
        const users = await createUsers();
        await User.bulkCreate(users);
        console.log("Users seeded successfully");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};

module.exports = {
    seedUsers,
};
