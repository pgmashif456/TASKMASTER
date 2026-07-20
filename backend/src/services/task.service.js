   import { Op } from "sequelize";
import { Task, User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/roles.js";
import { TASK_STATUS } from "../constants/taskStatus.js";

export const createTask = async (taskData, adminId) => {
  const {
    title,
    description,
    priority,
    status,
    dueDate,
    assignedTo,
  } = taskData;

  // Check Student Exists
  const student = await User.findByPk(assignedTo);

  if (!student) {
    throw new ApiError(404, "Assigned student not found");
  }

  // Check Role
  if (student.role !== ROLES.STUDENT) {
    throw new ApiError(400, "Task can only be assigned to a student");
  }

  // Create Task
  const task = await Task.create({
    title,
    description,
    priority,
    status,
    dueDate,
    assignedBy: adminId,
    assignedTo,
  });

  return task;
};

export const getAllTasks = async (
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
  sortBy = "createdAt",
  order = "DESC"
) => {
  const offset = (page - 1) * limit;

  const where = {};

  // Search
  if (search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        description: {
          [Op.iLike]: `%${search}%`,
        },
      },
    ];
  }

  // Filter by Status
  if (status) {
    where.status = status;
  }

  // Filter by Priority
  if (priority) {
    where.priority = priority;
  }

  // Allowed Sort Fields
  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "dueDate",
    "priority",
    "status",
    "title",
  ];

  if (!allowedSortFields.includes(sortBy)) {
    sortBy = "createdAt";
  }

  order = order.toUpperCase();

  if (!["ASC", "DESC"].includes(order)) {
    order = "DESC";
  }

  const { count, rows } = await Task.findAndCountAll({
    where,
    limit,
    offset,
    include: [
      {
        model: User,
        as: "assignedByUser",
        attributes: ["id", "name", "email"],
      },
      {
        model: User,
        as: "assignedToUser",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [[sortBy, order]],
  });

  return {
    totalTasks: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    limit,
    tasks: rows,
  };
};

export const getTaskById = async (taskId) => {
  const task = await Task.findByPk(taskId, {
    include: [
      {
        model: User,
        as: "assignedByUser",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "assignedToUser",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

export const deleteTask = async (taskId) => {
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await task.destroy();
};

export const getMyTasks = async (studentId) => {
  return await Task.findAll({
    where: {
      assignedTo: studentId,
    },
    order: [["createdAt", "DESC"]],
  });
};

export const updateTaskStatus = async (
  taskId,
  studentId,
  status
) => {
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.assignedTo !== studentId) {
    throw new ApiError(
      403,
      "You are not allowed to update this task"
    );
  }

  task.status = status;

  await task.save();

  return task;
};

export const updateTask = async (
  taskId,
  updateData
) => {
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await task.update(updateData);

  return task;
};

export const restoreTask = async (taskId) => {
  const task = await Task.findByPk(taskId, {
    paranoid: false,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await task.restore();

  return task;
};

export const getDeletedTasks = async () => {
  return await Task.findAll({
    paranoid: false,
    where: {
      deletedAt: {
        [Op.ne]: null,
      },
    },
  });
};