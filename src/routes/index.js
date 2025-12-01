"use strict";

const express = require("express");
const router = express.Router();

router.use("/api/v1", require("./access"));

router.use("/api/v1", require("./leave"));
router.use("/api/v1", require("./attendance"));
router.use("/api/v1", require("./employee"));
router.use("/api/v1", require("./payroll"));

module.exports = router;
