 import { Router } from "express";

import {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
  getMyTasksController,
  updateTaskStatusController,
  restoreTaskController,
  getDeletedTasksController,
} from "../controllers/task.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";

 import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  getTasksQuerySchema,
} from "../validations/task.validation.js";

 
import { ROLES } from "../constants/roles.js";

const router = Router();

/* ---------- Admin Routes ---------- */

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validationMiddleware(createTaskSchema),
  createTaskController
);

 router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validationMiddleware(getTasksQuerySchema, "query"),
  getAllTasksController
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validationMiddleware(updateTaskSchema),
  updateTaskController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteTaskController
);

router.patch(
  "/:id/restore",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  restoreTaskController
);

router.get(
  "/deleted",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getDeletedTasksController
);

/* ---------- Student Routes ---------- */

router.get(
  "/my-tasks",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getMyTasksController
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  validationMiddleware(updateTaskStatusSchema),
  updateTaskStatusController
);

/* ---------- Common Route ---------- */

router.get(
  "/:id",
  authMiddleware,
  getTaskByIdController
);

export default router;