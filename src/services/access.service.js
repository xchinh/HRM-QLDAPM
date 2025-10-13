"use strict";

const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { getDataInfo } = require("../utils");
const { createPairToken, verifyToken } = require("../auth/authUtils");
const {
    NotFoundError,
    ConflictError,
    UnauthorizedError,
} = require("../core/error.response");

class AccessService {
    static signup = async ({ username, password }) => {
        if (!username) {
            throw new NotFoundError("Username is required");
        }

        if (!password) {
            throw new NotFoundError("Password is required");
        }

        const user = await UserRepository.findUser(username);
        if (user) {
            throw new ConflictError("User already register");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await UserRepository.create({
            username,
            password: passwordHash,
        });
        if (newUser) {
            return {
                user: getDataInfo({
                    object: newUser,
                    field: ["id", "username"],
                }),
            };
        }
    };

    static login = async ({ username, password }) => {
        if (!username) {
            throw new NotFoundError("Username is required");
        }

        if (!password) {
            throw new NotFoundError("Password is required");
        }

        const foundUser = await UserRepository.findUser(username);
        if (!foundUser) {
            throw new NotFoundError("User is not found");
        }

        const validPassword = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!validPassword) {
            throw new UnauthorizedError("Invalid password");
        }

        const tokens = await createPairToken({
            payload: {
                username: foundUser.username,
                id: foundUser.id,
            },
        });

        return {
            user: getDataInfo({
                object: foundUser,
                field: ["id", "username"],
            }),
            tokens,
        };
    };

    static handleRefresh = async ({ refreshToken }) => {
        if (!refreshToken) {
            throw new NotFoundError("Refresh token is required");
        }

        const decoded = await verifyToken(refreshToken, true);
        if (!decoded) {
            throw new UnauthorizedError("Invalid refreshToken");
        }

        const newTokens = await createPairToken({
            payload: {
                username: decoded.username,
                id: decoded.id,
            },
        });

        return {
            tokens: newTokens,
        };
    };
}

module.exports = AccessService;
