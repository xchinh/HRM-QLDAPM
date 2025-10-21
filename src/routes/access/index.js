"use strict";

const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../middlewares/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT access token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         refreshToken:
 *           type: string
 *           description: JWT refresh token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     UserInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID
 *           example: 1
 *         username:
 *           type: string
 *           description: Username
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           description: User role code
 *           example: '0004'
 */

// router.post("/auth/signup", asyncHandler(AccessController.signup));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user and get access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: Login successful
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     tokens:
 *                       $ref: '#/components/schemas/TokenResponse'
 *                     user:
 *                       $ref: '#/components/schemas/UserInfo'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/auth/login", asyncHandler(AccessController.login));

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token received during login
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token refreshed successfully
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
 *                   example: Token refreshed successfully
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     tokens:
 *                       $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Invalid refresh token
 *       401:
 *         description: Refresh token expired or invalid
 *       500:
 *         description: Server error
 */
router.post(
    "/auth/refresh-token",
    asyncHandler(AccessController.handleRefresh)
);

router.use(authentication);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user and invalidate tokens
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
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
 *                   example: Logout successful
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     deleted:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Server error
 */
router.post("/auth/logout", asyncHandler(AccessController.logout));

module.exports = router;
