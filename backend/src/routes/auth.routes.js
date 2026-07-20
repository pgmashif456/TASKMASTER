 import { Router } from "express";

import {
  registerController,
  loginController,
  profileController,
} from "../controllers/auth.controller.js";

import validationMiddleware from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";

const router = Router();

// Public Routes
 /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register New User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Asif Khan
 *               email:
 *                 type: string
 *                 example: asif@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               role:
 *                 type: string
 *                 example: STUDENT
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  validationMiddleware(registerSchema),
  registerController
);

 /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  validationMiddleware(loginSchema),
  loginController
);
// Protected Route
 /**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get Logged-in User Profile
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/profile",
  authMiddleware,
  profileController
);

export default router;