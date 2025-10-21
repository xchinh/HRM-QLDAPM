"use strict";

const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../helpers/asyncHandler");
const LeaveController = require("../../controllers/leave.controller");
const { authentication } = require("../../middlewares/auth.middleware");
const { checkPermission } = require("../../auth/authUtils");
const { ROLE } = require("../../enums");

router.post("/leave/create", asyncHandler(LeaveController.create));
router.get("/leave/data", asyncHandler(LeaveController.getAllById));

// manager or admin or hr
router.use(checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]));
router.get("/leave", asyncHandler(LeaveController.getAll));
router.patch("/leave/approve/:id", asyncHandler(LeaveController.approveLeave));
router.patch("/leave/reject/:id", asyncHandler(LeaveController.rejectLeave));

module.exports = router;
