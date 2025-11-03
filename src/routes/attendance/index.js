"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const AttendanceController = require("../../controllers/attendance.controller");
const { checkPermission } = require("../../auth/authUtils");
const { ROLE } = require("../../enums");
const router = express.Router();

/**
 * @swagger
 * /attendances:
 *   get:
 *     tags: [Attendance]
 *     summary: Get all attendance records
 *     description: Requires ADMIN, HR, or MANAGER role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get(
  "/attendances",
  checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
  asyncHandler(AttendanceController.getAll)
);

/**
 * @swagger
 * /attendance/{id}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance records by employee ID
 *     description: Requires ADMIN, HR, or MANAGER role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema: { type: integer, example: 123 }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Successfully retrieved employee attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid employee ID
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get(
  "/attendance/:id",
  checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
  asyncHandler(AttendanceController.getAllById)
);

/**
 * @swagger
 * /attendance/{id}:
 *   post:
 *     tags: [Attendance]
 *     summary: Create attendance record for employee
 *     description: Work hours are calculated automatically from check-in/out
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema: { type: integer, example: 123 }
 *       - $ref: '#/components/parameters/ClientId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, checkIn, status]
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: YYYY-MM-DD
 *                 example: "2025-10-28"
 *               checkIn:
 *                 type: string
 *                 format: time
 *                 description: HH:mm:ss
 *                 example: "08:00:00"
 *               checkOut:
 *                 type: string
 *                 format: time
 *                 description: HH:mm:ss (optional)
 *                 example: "17:00:00"
 *               status:
 *                 type: string
 *                 enum: [present, absent, late, half-day]
 *                 example: present
 *     responses:
 *       201:
 *         description: Attendance record created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid input (missing required fields or invalid time)
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       409:
 *         description: Attendance already exists for this date
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.post(
  "/attendance/:id",
  checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
  asyncHandler(AttendanceController.create)
);

module.exports = router;