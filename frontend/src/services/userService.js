 import api from "./api.js";

export const getStudentsApi = async () => {
  const response = await api.get("/users/students");
  return response.data;
};