  import Joi from "joi";

import { TASK_PRIORITY } from "../constants/taskPriority.js";
import { TASK_STATUS } from "../constants/taskStatus.js";

export const createTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .allow("", null),

  priority: Joi.string()
    .valid(...Object.values(TASK_PRIORITY))
    .default(TASK_PRIORITY.MEDIUM),

  status: Joi.string()
    .valid(...Object.values(TASK_STATUS))
    .default(TASK_STATUS.PENDING),

  dueDate: Joi.date().required(),

  assignedTo: Joi.string()
    .uuid()
    .required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100),

  description: Joi.string()
    .trim()
    .allow("", null),

  priority: Joi.string()
    .valid(...Object.values(TASK_PRIORITY)),

  dueDate: Joi.date(),

  assignedTo: Joi.string()
    .uuid(),
}).min(1);

export const updateTaskStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(TASK_STATUS))
    .required(),
});

export const getTasksQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),

  search: Joi.string()
    .allow("")
    .optional(),

  status: Joi.string()
    .valid(...Object.values(TASK_STATUS))
    .optional(),

  priority: Joi.string()
    .valid(...Object.values(TASK_PRIORITY))
    .optional(),

  sortBy: Joi.string()
    .valid(
      "createdAt",
      "updatedAt",
      "dueDate",
      "priority",
      "status",
      "title"
    )
    .default("createdAt"),

  order: Joi.string()
    .uppercase()
    .valid("ASC", "DESC")
    .default("DESC"),
});