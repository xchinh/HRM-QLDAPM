"use strict";

const User = require("../models/users.model");

class UserRepository {
    static findUser = async (username) => {
        return User.findOne({
            where: {
                username,
            },
        });
    };

    static findById = async (id) => {
        return User.findByPk(id);
    };

    static create = async ({ username, password, role, options = {} }) => {
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
        });
    };
}

module.exports = UserRepository;
