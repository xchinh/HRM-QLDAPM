"use strict";

const { verifyToken } = require("../auth/authUtils");
const { UnauthorizedError } = require("../core/error.response");

const HEADER = {
    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "authorization",
};

const authentication = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) {
        throw new UnauthorizedError("Invalid Request");
    }
    const accessTokenBearer = req.headers[HEADER.AUTHORIZATION];
    if (!accessTokenBearer) {
        throw new UnauthorizedError("Invalid Request");
    }

    const accessToken = accessTokenBearer.split(" ")[1];
    try {
        const decoded = await verifyToken(accessToken);
        if (!decoded) {
            throw new UnauthorizedError("AccessToken invalid");
        }

        req.user = {
            userId: decoded.id,
            username: decoded.username,
            role: decoded.role,
            employeeId: decoded.employeeId,
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authentication,
};
