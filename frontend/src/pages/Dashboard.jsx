import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth.js";
import { getAdminDashboardApi, getStudentDashboardApi } from "../services/dashboardService.js";
import { getAllTasksApi, getMyTasksApi } from "../services/taskService.js";
import { StatCard } from "../components/dashboard/StatCard.jsx";
import { TaskCard } from "../components/tasks/TaskCard.jsx";
import { SkeletonGrid } from "../components/common/SkeletonLoader.jsx";
import { EmptyState } from "../components/common/EmptyState.jsx";
import {
  FiCheckSquare,
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiUsers,
  FiPlus,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Fetch Dashboard Stats
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useQuery({
    queryKey: ["dashboard", isAdmin ? "admin" : "student"],
    queryFn: async () => {
      const res = isAdmin
        ? await getAdminDashboardApi()
        : await getStudentDashboardApi();
      return res.data;
    },
  });

  // Fetch Recent Tasks
  const {
    data: recentTasksData,
    isLoading: isTasksLoading,
  } = useQuery({
    queryKey: ["recent-tasks", isAdmin ? "admin" : "student"],
    queryFn: async () => {
      if (isAdmin) {
        const res = await getAllTasksApi({ page: 1, limit: 4 });
        return res.data?.tasks || [];
      } else {
        const res = await getMyTasksApi();
        return (res.data || []).slice(0, 4);
      }
    },
  });

  const stats = dashboardData || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider mb-2 border border-blue-400/30">
            {isAdmin ? "Admin Overview" : "Student Portal"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            {isAdmin
              ? "Monitor task delegation, track student activities, and manage workspace efficiency."
              : "Track your assigned task progress, review deadlines, and update status seamlessly."}
          </p>
        </div>

        {isAdmin && (
          <div className="relative z-10 shrink-0">
            <button
              onClick={() => navigate("/tasks?create=true")}
              className="inline-flex items-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl shadow-md transition-all group"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span>Create Task</span>
            </button>
          </div>
        )}
      </div>

      {/* Stat Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">System Metrics</h2>
          <span className="text-xs font-semibold text-slate-400">Real-time Statistics</span>
        </div>

        {isDashboardLoading ? (
          <SkeletonGrid count={4} />
        ) : isDashboardError ? (
          <div className="p-6 bg-rose-50 text-rose-700 rounded-2xl text-sm font-medium border border-rose-100">
            Failed to load dashboard metrics. Please check connection.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {isAdmin ? (
              <>
                <StatCard
                  title="Total Tasks"
                  count={stats.totalTasks}
                  icon={FiCheckSquare}
                  color="blue"
                  subtitle="All system tasks"
                />
                <StatCard
                  title="Pending Tasks"
                  count={stats.pendingTasks}
                  icon={FiClock}
                  color="amber"
                  subtitle="Awaiting action"
                />
                <StatCard
                  title="In Progress"
                  count={stats.inProgressTasks}
                  icon={FiActivity}
                  color="indigo"
                  subtitle="Currently active"
                />
                <StatCard
                  title="Completed"
                  count={stats.completedTasks}
                  icon={FiCheckCircle}
                  color="emerald"
                  subtitle="Finished tasks"
                />
              </>
            ) : (
              <>
                <StatCard
                  title="Assigned Tasks"
                  count={stats.totalAssignedTasks}
                  icon={FiCheckSquare}
                  color="blue"
                  subtitle="Tasks assigned to you"
                />
                <StatCard
                  title="Pending Tasks"
                  count={stats.pendingTasks}
                  icon={FiClock}
                  color="amber"
                  subtitle="Requires attention"
                />
                <StatCard
                  title="In Progress"
                  count={stats.inProgressTasks}
                  icon={FiActivity}
                  color="indigo"
                  subtitle="Work underway"
                />
                <StatCard
                  title="Completed Tasks"
                  count={stats.completedTasks}
                  icon={FiCheckCircle}
                  color="emerald"
                  subtitle="Successfully done"
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Extra Stat if Admin: Total Students */}
      {isAdmin && stats.totalStudents !== undefined && (
        <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-xs">
              <FiUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Total Enrolled Students</p>
              <p className="text-2xl font-black text-slate-800">{stats.totalStudents}</p>
            </div>
          </div>
          <span className="text-xs text-indigo-600 font-semibold bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-2xs">
            Student Role Account Count
          </span>
        </div>
      )}

      {/* Recent Tasks List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Recent Tasks</h2>
            <p className="text-xs text-slate-500">Quick view of latest task assignments</p>
          </div>
          <Link
            to="/tasks"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            View All Tasks &rarr;
          </Link>
        </div>

        {isTasksLoading ? (
          <SkeletonGrid count={4} />
        ) : recentTasksData?.length === 0 ? (
          <EmptyState
            title="No tasks available"
            description="Tasks assigned to you or created by admins will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentTasksData.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isAdmin={isAdmin}
                onView={() => navigate("/tasks")}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
