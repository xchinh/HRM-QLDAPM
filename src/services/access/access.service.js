"use strict";

const UserRepository = require("../../repositories/user.repository");
const bcrypt = require("bcrypt");
const { getDataInfo } = require("../../utils");
const { createPairToken, verifyToken } = require("../../auth/authUtils");
const {
    NotFoundError,
    ConflictError,
    UnauthorizedError,
    BadRequestError,
} = require("../../core/error.response");
const { ROLE } = require("../../enums");
const EmployeeRepository = require("../../repositories/employee.repository");

class AccessService {
    // static signup = async ({ username, password, role = ROLE.EMPLOYEE }) => {
    //     if (!username) {
    //         throw new NotFoundError("Username is required");
    //     }

    //     if (!password) {
    //         throw new NotFoundError("Password is required");
    //     }

    //     const user = await UserRepository.findUser(username);
    //     if (user) {
    //         throw new ConflictError("User already register");
    //     }

    //     const passwordHash = await bcrypt.hash(password, 10);
    //     const newUser = await UserRepository.create({
    //         username,
    //         password: passwordHash,
    //         role,
    //     });
    //     if (newUser) {
    //         return {
    //             data: getDataInfo({
    //                 object: newUser,
    //                 field: ["id", "username", "role"],
    //             }),
    //         };
    //     }
    // };

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

        const employee = await EmployeeRepository.findOne({
            attributes: {
                userId: foundUser.id,
            },
        });

        if (employee && !employee.isActive) {
            throw new BadRequestError("Account has been disabled");
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            throw new UnauthorizedError("Invalid password");
        }

        const tokens = await createPairToken({
            payload: {
                username: foundUser.username,
                id: foundUser.id,
                role: foundUser.role,
            },
        });

        return {
            data: getDataInfo({
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
                role: decoded.role,
            },
        });

        return {
            tokens: newTokens,
        };
    };
}

module.exports = AccessService;
