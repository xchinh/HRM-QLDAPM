"use strict";

const JWT = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt.config");
const { UnauthorizedError } = require("../core/error.response");

const createPairToken = async ({ payload }) => {
    const accessToken = await JWT.sign(payload, jwtConfig.accessSecret, {
        expiresIn: 60 * 5,
    });

    const refreshToken = await JWT.sign(payload, jwtConfig.refreshSecret, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

const verifyToken = async (token, isRefresh = false) => {
    return !isRefresh
        ? await JWT.verify(token, jwtConfig.accessSecret)
        : await JWT.verify(token, jwtConfig.refreshSecret);
};

const checkPermission = (allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                throw new UnauthorizedError("User not authenticated");
            }

            if (!req.user.role || !Array.isArray(req.user.role)) {
                throw new UnauthorizedError("User role not found");
            }

            if (!allowedRoles || !Array.isArray(allowedRoles)) {
                throw new UnauthorizedError("Invalid permission configuration");
            }

            const hasPermission = req.user.role.some((userRole) =>
                allowedRoles.includes(userRole)
            );

            if (!hasPermission) {
                throw new UnauthorizedError("Insufficient permissions");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    createPairToken,
    verifyToken,
    checkPermission,
};
