 import { User, Task } from "../models/index.js";
import { ROLES } from "../constants/roles.js";
import { TASK_STATUS } from "../constants/taskStatus.js";

 //admin dashboard service//
 export const getAdminDashboard = async () => {
  const totalStudents = await User.count({
    where: {
      role: ROLES.STUDENT,
    },
  });

  const totalTasks = await Task.count();

  const pendingTasks = await Task.count({
    where: {
      status: TASK_STATUS.PENDING,
    },
  });

  const inProgressTasks = await Task.count({
    where: {
      status: TASK_STATUS.IN_PROGRESS,
    },
  });

  const completedTasks = await Task.count({
    where: {
      status: TASK_STATUS.COMPLETED,
    },
  });

  return {
    totalStudents,
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };
};

// student dashboard service//
export const getStudentDashboard = async (studentId) => {
  const totalAssignedTasks = await Task.count({
    where: {
      assignedTo: studentId,
    },
  });

  const pendingTasks = await Task.count({
    where: {
      assignedTo: studentId,
      status: TASK_STATUS.PENDING,
    },
  });

  const inProgressTasks = await Task.count({
    where: {
      assignedTo: studentId,
      status: TASK_STATUS.IN_PROGRESS,
    },
  });

  const completedTasks = await Task.count({
    where: {
      assignedTo: studentId,
      status: TASK_STATUS.COMPLETED,
    },
  });

  return {
    totalAssignedTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };
};