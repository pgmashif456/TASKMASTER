import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiEdit3, FiTrash2, FiEye, FiCheckCircle } from "react-icons/fi";
import { TaskStatusBadge } from "./TaskStatusBadge.jsx";
import { TaskPriorityBadge } from "./TaskPriorityBadge.jsx";
import { formatDate } from "../../utils/formatters.js";

export const TaskCard = ({
  task,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  isAdmin = false,
}) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>

        <h4
          onClick={() => onView(task)}
          className="text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
        >
          {task.title}
        </h4>

        <p className="text-xs text-slate-500 mt-2 line-clamp-2 min-h-8">
          {task.description || "No description provided."}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <FiCalendar className="text-slate-400" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
          {task.assignedToUser && (
            <div className="flex items-center space-x-1.5" title={`Assigned to: ${task.assignedToUser.email}`}>
              <FiUser className="text-slate-400" />
              <span className="font-medium text-slate-700">{task.assignedToUser.name}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-1 pt-2">
          <button
            onClick={() => onView(task)}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            title="View Details"
          >
            <FiEye className="w-4 h-4" />
          </button>

          {!isAdmin && onStatusChange && (
            <div className="relative group">
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                className="text-xs font-semibold py-1 px-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 border-none cursor-pointer focus:outline-hidden"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          )}

          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                title="Edit Task"
              >
                <FiEdit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task)}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Delete Task"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
