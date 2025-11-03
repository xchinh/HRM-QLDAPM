"use strict";

const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../helpers/asyncHandler");
const LeaveController = require("../../controllers/leave.controller");
const { checkPermission } = require("../../auth/authUtils");
const { ROLE } = require("../../enums");

/**
 * @swagger
 * /leave/{id}:
 *   post:
 *     tags: [Leave]
 *     summary: Create new leave request
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
 *             $ref: '#/components/schemas/CreateLeave'
 *     responses:
 *       201:
 *         description: Leave request created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
router.post("/leave/:id", asyncHandler(LeaveController.create));

/**
 * @swagger
 * /leave/{id}:
 *   get:
 *     tags: [Leave]
 *     summary: Get leave requests for an employee
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema: { type: integer, example: 123 }
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter by status (001=pending, 002=approved, 003=rejected)
 *         schema: { type: string, enum: [001, 002, 003] }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
router.get("/leave/:id", asyncHandler(LeaveController.getAllByEmployee));

/**
 * @swagger
 * /leave/{id}:
 *   delete:
 *     tags: [Leave]
 *     summary: Delete a pending leave request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Leave request ID
 *         schema: { type: integer, example: 1 }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Leave request deleted
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Leave not found
 */
router.delete("/leave/:id", asyncHandler(LeaveController.delete));

/**
 * @swagger
 * /leaves:
 *   get:
 *     tags: [Leave]
 *     summary: Get all leave requests
 *     description: Requires ADMIN, HR, or MANAGER role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter by status
 *         schema: { type: string, enum: [001, 002, 003] }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/leaves",
  checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
  asyncHandler(LeaveController.getAll)
);

/**
 * @swagger
 * /leave/{id}/approve:
 *   patch:
 *     tags: [Leave]
 *     summary: Approve leave request
 *     description: Requires ADMIN, HR, or MANAGER role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Leave request ID
 *         schema: { type: integer, example: 1 }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Approved
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Leave not found
 */
router.patch(
  "/leave/:id/approve",
  checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
  asyncHandler(LeaveController.approveLeave)
);

/**
 * @swagger
 * /leave/{id}/reject:
 *   patch:
 *     tags: [Leave]
 *     summary: Reject leave request
 *     description: Requires ADMIN, HR, or MANAGER role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Leave request ID
 *         schema: { type: integer, example: 1 }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Rejected
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Leave not found
 */
router.patch(
  "/leave/:id/reject",
  checkPermission([ROLE.ADMIN, ROLE.HR, ROLE.MANAGER]),
  asyncHandler(LeaveController.rejectLeave)
);

module.exports = router;