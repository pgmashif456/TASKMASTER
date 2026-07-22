import React, { createContext, useState, useEffect, useCallback } from "react";
import { loginApi, registerApi, getProfileApi } from "../services/authService.js";
import {
  getToken,
  setToken,
  getStoredUser,
  setStoredUser,
  clearAuthSession,
} from "../utils/tokenStorage.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setTokenState] = useState(getToken());
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and check auto-login token validity
  const initAuth = useCallback(async () => {
    const existingToken = getToken();
    if (existingToken) {
      try {
        const response = await getProfileApi();
        if (response?.data) {
          setUser(response.data);
          setStoredUser(response.data);
        }
      } catch (err) {
        clearAuthSession();
        setUser(null);
        setTokenState(null);
      }
    } else {
      clearAuthSession();
      setUser(null);
      setTokenState(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await loginApi(credentials);
      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setStoredUser(userData);
      setTokenState(newToken);
      setUser(userData);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userDataInput) => {
    setIsLoading(true);
    try {
      const response = await registerApi(userDataInput);
      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setStoredUser(userData);
      setTokenState(newToken);
      setUser(userData);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    clearAuthSession();
    setUser(null);
    setTokenState(null);
  };

  const isAdmin = user?.role === "ADMIN";
  const isStudent = user?.role === "STUDENT";
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        isAdmin,
        isStudent,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
