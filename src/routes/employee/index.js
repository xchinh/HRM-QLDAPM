"use strict";

const express = require("express");
const EmployeeController = require("../../controllers/employee.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const router = express.Router();

router.get("/employee", asyncHandler(EmployeeController.getAll));
router.post("/employee/create", asyncHandler(EmployeeController.create));
router.patch("/employee/update", asyncHandler(EmployeeController.update));
router.patch("/employee/disable", asyncHandler(EmployeeController.disable));

module.exports = router;
