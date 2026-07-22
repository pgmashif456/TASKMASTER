  import { Router } from "express";

import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import userRoutes from "./user.routes.js";   // ✅ Add this

const router = Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/users", userRoutes);

export default router;