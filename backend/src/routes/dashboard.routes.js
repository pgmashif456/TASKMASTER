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

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAdminDashboardController
);

/* ---------- Student Dashboard ---------- */

router.get(
  "/student",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentDashboardController
);

export default router;