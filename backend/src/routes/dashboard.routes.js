  import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
  getAdminDashboardController,
  getStudentDashboardController,
} from "../controllers/dashboard.controller.js";

const router = Router();

/* ---------- Admin Dashboard ---------- */

 /**
 * @swagger
 * /dashboard/admin:
 *   get:
 *     summary: Get Admin Dashboard
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard fetched successfully
 */
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAdminDashboardController
);

/**
 * @swagger
 * /dashboard/student:
 *   get:
 *     summary: Get Student Dashboard
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard fetched successfully
 */
router.get(
  "/student",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentDashboardController
);

export default router;