import api from "./api.js";

export const getAdminDashboardApi = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data; // { statusCode, message, data: { totalStudents, totalTasks, pendingTasks, inProgressTasks, completedTasks } }
};

export const getStudentDashboardApi = async () => {
  const response = await api.get("/dashboard/student");
  return response.data; // { statusCode, message, data: { totalAssignedTasks, pendingTasks, inProgressTasks, completedTasks } }
};
