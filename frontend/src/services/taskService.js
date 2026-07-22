import api from "./api.js";

export const getAllTasksApi = async (params = {}) => {
  const response = await api.get("/tasks", { params });
  return response.data;
};

export const getMyTasksApi = async () => {
  const response = await api.get("/tasks/my-tasks");
  return response.data;
};

export const getTaskByIdApi = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTaskApi = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const updateTaskApi = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTaskApi = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const updateTaskStatusApi = async (id, status) => {
  const response = await api.patch(`/tasks/${id}/status`, { status });
  return response.data;
};

export const getDeletedTasksApi = async () => {
  const response = await api.get("/tasks/deleted");
  return response.data;
};

export const restoreTaskApi = async (id) => {
  const response = await api.patch(`/tasks/${id}/restore`);
  return response.data;
};
