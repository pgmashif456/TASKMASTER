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

/* =========================================================
   ADMIN ROUTES
========================================================= */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - dueDate
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *                 example: Build Login API
 *               description:
 *                 type: string
 *                 example: Implement JWT Authentication
 *               priority:
 *                 type: string
 *                 example: HIGH
 *               status:
 *                 type: string
 *                 example: PENDING
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-15
 *               assignedTo:
 *                 type: string
 *                 example: 5c6b8b3d-2e8b-49cf-bc58-2a1e7f123456
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validationMiddleware(createTaskSchema),
  createTaskController
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: login
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: PENDING
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         example: HIGH
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         example: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         example: DESC
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validationMiddleware(getTasksQuerySchema, "query"),
  getAllTasksController
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validationMiddleware(updateTaskSchema),
  updateTaskController
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteTaskController
);

/**
 * @swagger
 * /tasks/{id}/restore:
 *   patch:
 *     summary: Restore a deleted task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task restored successfully
 */
router.patch(
  "/:id/restore",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  restoreTaskController
);

/**
 * @swagger
 * /tasks/deleted:
 *   get:
 *     summary: Get all deleted tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted tasks fetched successfully
 */
router.get(
  "/deleted",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getDeletedTasksController
);

/* =========================================================
   STUDENT ROUTES
========================================================= */

/**
 * @swagger
 * /tasks/my-tasks:
 *   get:
 *     summary: Get logged-in student's tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student tasks fetched successfully
 */
router.get(
  "/my-tasks",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getMyTasksController
);

/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Task status updated successfully
 */
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  validationMiddleware(updateTaskStatusSchema),
  updateTaskStatusController
);

/* =========================================================
   COMMON ROUTES
========================================================= */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       404:
 *         description: Task not found
 */
router.get(
  "/:id",
  authMiddleware,
  getTaskByIdController
);

export default router;