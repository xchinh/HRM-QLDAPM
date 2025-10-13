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

    static create = async ({ username, password }) => {
        return User.create({ username, password });
    };
}

module.exports = UserRepository;
