"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const AttendanceController = require("../../controllers/attendance.controller");
const router = express.Router();

router.get("/attendance", asyncHandler(AttendanceController.getAll));
router.get("/attendance/:id", asyncHandler(AttendanceController.getAllById));
router.post(
    "/attendance/create/:id",
    asyncHandler(AttendanceController.create)
);
module.exports = router;
