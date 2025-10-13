"use strict";

const { CREATED, OK } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    static signup = async (req, res, next) => {
        new CREATED({
            message: "Register successful",
            metadata: await AccessService.signup(req.body),
        }).send(res);
    };

    static login = async (req, res, next) => {
        new OK({
            message: "Login successful",
            metadata: await AccessService.login(req.body),
        }).send(res);
    };

    static handleRefresh = async (req, res, next) => {
        new CREATED({
            message: "Handle refresh token successful",
            metadata: await AccessService.handleRefresh(req.body),
        }).send(res);
    };

    static logout = async (req, res, next) => {
        new OK({
            message: "Logout successful",
            metadata: null,
        }).send(res);
    };
}

module.exports = AccessController;
