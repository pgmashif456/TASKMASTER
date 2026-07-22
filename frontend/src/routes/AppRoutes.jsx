import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { AuthLayout } from "../layouts/AuthLayout.jsx";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import { Tasks } from "../pages/Tasks.jsx";
import { DeletedTasks } from "../pages/DeletedTasks.jsx";
import { Profile } from "../pages/Profile.jsx";
import { Unauthorized } from "../pages/Unauthorized.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import { ROLES } from "../constants/roles.js";

// Helper component for public-only auth routes (Login/Register)
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route
        element={
          <PublicOnlyRoute>
            <AuthLayout />
          </PublicOnlyRoute>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes inside Main Layout */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STUDENT]} />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Only Trash Route */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/tasks/deleted" element={<DeletedTasks />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Fallback Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
