"use strict";

const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.post("/auth/signup", asyncHandler(AccessController.signup));
router.post("/auth/login", asyncHandler(AccessController.login));
router.post(
    "/auth/refresh-token",
    asyncHandler(AccessController.handleRefresh)
);

router.use(authentication);

router.post("/auth/logout", asyncHandler(AccessController.logout));

module.exports = router;
