"use strict";

const JWT = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt.config");

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

module.exports = {
    createPairToken,
    verifyToken,
};
