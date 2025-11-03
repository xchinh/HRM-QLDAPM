"use strict";

const express = require("express");
const EmployeeController = require("../../controllers/employee.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { checkPermission } = require("../../auth/authUtils");
const { ROLE } = require("../../enums");
const router = express.Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     tags: [Employees]
 *     summary: Get all employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Successfully retrieved all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/employees", asyncHandler(EmployeeController.getAll));

/**
 * @swagger
 * /employee:
 *   post:
 *     tags: [Employees]
 *     summary: Create a new employee
 *     description: Create employee and user account (role inferred from position)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ClientId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/employee",
  checkPermission([ROLE.ADMIN, ROLE.MANAGER, ROLE.HR]),
  asyncHandler(EmployeeController.create)
);

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     tags: [Employees]
 *     summary: Get employee by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Successfully retrieved employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
router.get("/employee/:id", asyncHandler(EmployeeController.getEmployee));

/**
 * @swagger
 * /employee/{id}:
 *   patch:
 *     tags: [Employees]
 *     summary: Update an employee
 *     description: If position changes, related user role may be updated
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *       - $ref: '#/components/parameters/ClientId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string, format: email }
 *               department_id: { type: integer }
 *               position_name: { type: string }
 *               base_salary: { type: number, minimum: 1 }
 *     responses:
 *       200:
 *         description: Employee updated successfully
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
router.patch("/employee/:id", asyncHandler(EmployeeController.update));

/**
 * @swagger
 * /employee/disable/{id}:
 *   patch:
 *     tags: [Employees]
 *     summary: Disable an employee
 *     description: Set employee status to inactive
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Employee disabled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.patch(
  "/employee/disable/:id",
  checkPermission([ROLE.ADMIN, ROLE.MANAGER, ROLE.HR]),
  asyncHandler(EmployeeController.disable)
);

/**
 * @swagger
 * /employee/enable/{id}:
 *   patch:
 *     tags: [Employees]
 *     summary: Enable an employee
 *     description: Set employee status to active
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *       - $ref: '#/components/parameters/ClientId'
 *     responses:
 *       200:
 *         description: Employee enabled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.patch(
  "/employee/enable/:id",
  checkPermission([ROLE.ADMIN, ROLE.MANAGER, ROLE.HR]),
  asyncHandler(EmployeeController.enable)
);

module.exports = router;