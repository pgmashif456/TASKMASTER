 import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
  updateTaskStatus,
} from "../services/task.service.js";

export const createTaskController = asyncHandler(async (req, res) => {
  const task = await createTask(req.body, req.user.id);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Task created successfully",
      task
    )
  );
});
export const getAllTasksController = asyncHandler(async (req, res) => {
  const tasks = await getAllTasks();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Tasks fetched successfully",
      tasks
    )
  );
});

export const getTaskByIdController = asyncHandler(async (req, res) => {
  const task = await getTaskById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Task fetched successfully",
      task
    )
  );
});

export const updateTaskController = asyncHandler(async (req, res) => {
  const task = await updateTask(
    req.params.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Task updated successfully",
      task
    )
  );
});

export const deleteTaskController = asyncHandler(async (req, res) => {
  await deleteTask(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Task deleted successfully"
    )
  );
});

export const getMyTasksController = asyncHandler(async (req, res) => {
  const tasks = await getMyTasks(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "My tasks fetched successfully",
      tasks
    )
  );
});

export const updateTaskStatusController = asyncHandler(async (req, res) => {
  const task = await updateTaskStatus(
    req.params.id,
    req.user.id,
    req.body.status
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Task status updated successfully",
      task
    )
  );
});