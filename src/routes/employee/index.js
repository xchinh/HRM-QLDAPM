"use strict";

const express = require("express");
const EmployeeController = require("../../controllers/employee.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - department_id
 *         - position_name
 *         - base_salary
 *       properties:
 *         id:
 *           type: integer
 *           description: Employee ID
 *           example: 1
 *         fullName:
 *           type: string
 *           description: Employee's full name
 *           example: John Doe
 *         email:
 *           type: string
 *           description: Employee's email
 *           example: john.doe@example.com
 *         birthday:
 *           type: string
 *           format: date
 *           description: Employee's date of birth
 *           example: 1990-01-01
 *         hired_at:
 *           type: string
 *           format: date
 *           description: Employee's hire date
 *           example: 2023-01-15
 *         department_id:
 *           type: integer
 *           description: Department ID
 *           example: 1
 *         position_name:
 *           type: string
 *           description: Employee's position
 *           example: Developer
 *         base_salary:
 *           type: number
 *           description: Employee's base salary
 *           example: 5000
 *         isActive:
 *           type: boolean
 *           description: Whether employee is active
 *           example: true
 */

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Find all employee successful
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Server error
 */
router.get("/employee", asyncHandler(EmployeeController.getAll));
/**
 * @swagger
 * /employee/create:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - department_id
 *               - position_name
 *               - base_salary
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 example: jane.smith@example.com
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: 1992-05-15
 *               hired_at:
 *                 type: string
 *                 format: date
 *                 example: 2023-03-01
 *               department_id:
 *                 type: integer
 *                 example: 2
 *               position_name:
 *                 type: string
 *                 example: Senior Developer
 *               base_salary:
 *                 type: number
 *                 example: 6000
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Create Employee successful
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         employee:
 *                           $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/employee/create", asyncHandler(EmployeeController.create));
/**
 * @swagger
 * /employee/update/{id}:
 *   patch:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Jane Smith-Johnson
 *               email:
 *                 type: string
 *                 example: jane.johnson@example.com
 *               department_id:
 *                 type: integer
 *                 example: 3
 *               position_name:
 *                 type: string
 *                 example: Manager
 *               base_salary:
 *                 type: number
 *                 example: 8000
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Update Employee successful
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.patch("/employee/update/:id", asyncHandler(EmployeeController.update));
/**
 * @swagger
 * /employee/disable/{id}:
 *   patch:
 *     summary: Disable an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee disabled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Disable Employee successful
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         fullName:
 *                           type: string
 *                           example: Jane Smith
 *                         isActive:
 *                           type: boolean
 *                           example: false
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.patch("/employee/disable/:id", asyncHandler(EmployeeController.disable));

/**
 * @swagger
 * /employee/enable/{id}:
 *   patch:
 *     summary: Enable a previously disabled employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee enabled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Enable Employee successful
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         fullName:
 *                           type: string
 *                           example: Jane Smith
 *                         isActive:
 *                           type: boolean
 *                           example: true
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.patch("/employee/enable/:id", asyncHandler(EmployeeController.enable));
module.exports = router;
