import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../constants/api.js";
import { getToken, clearAuthSession } from "../utils/tokenStorage.js";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global HTTP Errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";

    if (status === 401) {
      clearAuthSession();
      // Only toast if not already on login page
      if (!window.location.pathname.includes("/login")) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    } else if (status === 403) {
      toast.error(errorMessage || "You do not have permission to perform this action.");
    } else if (status >= 500) {
      toast.error("Internal Server Error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
