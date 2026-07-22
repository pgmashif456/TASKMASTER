import api from "./api.js";

export const loginApi = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data; // { statusCode, message, data: { token, user } }
};

export const registerApi = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data; // { statusCode, message, data: { token, user } }
};

export const getProfileApi = async () => {
  const response = await api.get("/auth/profile");
  return response.data; // { statusCode, message, data: user }
};
