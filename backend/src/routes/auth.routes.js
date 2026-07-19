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
router.post(
  "/register",
  validationMiddleware(registerSchema),
  registerController
);

router.post(
  "/login",
  validationMiddleware(loginSchema),
  loginController
);

// Protected Route
router.get(
  "/profile",
  authMiddleware,
  profileController
);

export default router;