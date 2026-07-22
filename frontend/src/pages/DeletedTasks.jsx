import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeletedTasksApi, restoreTaskApi } from "../services/taskService.js";
import { TaskStatusBadge } from "../components/tasks/TaskStatusBadge.jsx";
import { TaskPriorityBadge } from "../components/tasks/TaskPriorityBadge.jsx";
import { formatDate } from "../utils/formatters.js";
import { SkeletonGrid } from "../components/common/SkeletonLoader.jsx";
import { EmptyState } from "../components/common/EmptyState.jsx";
import toast from "react-hot-toast";
import { FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

export const DeletedTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: deletedResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deleted-tasks"],
    queryFn: async () => {
      const res = await getDeletedTasksApi();
      return res.data || [];
    },
  });

  const restoreMutation = useMutation({
    mutationFn: restoreTaskApi,
    onSuccess: () => {
      toast.success("Task restored successfully!");
      queryClient.invalidateQueries(["deleted-tasks"]);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to restore task.");
    },
  });

  const tasks = deletedResponse || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="pb-2 border-b border-slate-200/80">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <FiTrash2 className="text-rose-600" />
          <span>Soft-Deleted Tasks (Trash)</span>
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          View soft-deleted task records and restore them to active task workspace when needed.
        </p>
      </div>

      {isLoading ? (
        <SkeletonGrid count={4} />
      ) : isError ? (
        <div className="p-6 bg-rose-50 text-rose-700 rounded-2xl text-sm font-medium border border-rose-100">
          Failed to load deleted tasks.
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={FiTrash2}
          title="Trash is empty"
          description="There are currently no soft-deleted tasks in the database system."
        />
      ) : (
        <div className="w-full overflow-x-auto bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Deleted At</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800 text-sm">{task.title}</div>
                    {task.description && (
                      <div className="text-xs text-slate-400 line-clamp-1">{task.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <TaskStatusBadge status={task.status} />
                  </td>
                  <td className="px-6 py-4">
                    <TaskPriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    {formatDate(task.deletedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => restoreMutation.mutate(task.id)}
                      disabled={restoreMutation.isPending}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-200 transition-colors disabled:opacity-50"
                    >
                      <FiRefreshCw className="w-3.5 h-3.5" />
                      <span>Restore Task</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};
