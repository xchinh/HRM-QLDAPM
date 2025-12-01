"use strict";

const express = require("express");
const PayrollController = require("../../controllers/payroll.controller");
const { checkPermission } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { ROLE } = require("../../enums");
const router = express.Router();

/**
 * @swagger
 * /payroll/calculate/{id}:
 *   post:
 *     tags: [Payroll]
 *     summary: Calculate payroll for specific employee
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *       - $ref: '#/components/parameters/ClientId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [month, year]
 *             properties:
 *               month: { type: integer, minimum: 1, maximum: 12, example: 11 }
 *               year: { type: integer, example: 2025 }
 *     responses:
 *       200:
 *         description: Payroll calculated successfully
 */
router.post(
    "/payroll/calculate/:id",
    checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
    asyncHandler(PayrollController.calculateEmployee)
);

/**
 * @swagger
 * /payroll/calculate-all:
 *   post:
 *     tags: [Payroll]
 *     summary: Calculate payroll for all active employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ClientId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [month, year]
 *             properties:
 *               month: { type: integer, minimum: 1, maximum: 12, example: 11 }
 *               year: { type: integer, example: 2025 }
 *     responses:
 *       200:
 *         description: All payrolls calculated
 */
router.post(
    "/payroll/calculate-all",
    checkPermission([ROLE.ADMIN, ROLE.HR]),
    asyncHandler(PayrollController.calculateAll)
);

/**
 * @swagger
 * /payrolls:
 *   get:
 *     tags: [Payroll]
 *     summary: Get payrolls by month/year
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: month
 *         in: query
 *         required: true
 *         schema: { type: integer, minimum: 1, maximum: 12 }
 *       - name: year
 *         in: query
 *         required: true
 *         schema: { type: integer }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
    "/payrolls",
    checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
    asyncHandler(PayrollController.getByMonth)
);

/**
 * @swagger
 * /payroll/{id}:
 *   get:
 *     tags: [Payroll]
 *     summary: Get employee payroll
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *       - name: month
 *         in: query
 *         required: true
 *         schema: { type: integer }
 *       - name: year
 *         in: query
 *         required: true
 *         schema: { type: integer }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/payroll/:id", asyncHandler(PayrollController.getEmployee));

module.exports = router;
