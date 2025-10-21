"use strict";

const Employee = require("../models/Employee.model");
const User = require("../models/Users.model");

class UserRepository {
    static findUser = async (username) => {
        return User.findOne({
            where: {
                username,
            },
        });
    };

    static findById = async (id) => {
        return User.findByPk(id, {
            include: [
                {
                    model: Employee,
                    as: "employee",
                    attributes: ["fullName", "id"],
                },
            ],
        });
    };

    static create = async ({ username, password, role = [], options = {} }) => {
        return User.create({ username, password, role }, options);
    };

    static findAndUpdate = async ({
        updateData = {},
        attributes,
        transaction = null,
    }) => {
        return User.update(updateData, {
            where: attributes,
            transaction,
            returning: true,
        });
    };
}

module.exports = UserRepository;
