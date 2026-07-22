import React from "react";
import { FiEye, FiEdit3, FiTrash2, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { TaskStatusBadge } from "./TaskStatusBadge.jsx";
import { TaskPriorityBadge } from "./TaskPriorityBadge.jsx";
import { formatDate } from "../../utils/formatters.js";

export const TaskTable = ({
  tasks = [],
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  isAdmin = false,
  sortBy,
  order,
  onSort,
}) => {
  const renderSortHeader = (field, label) => {
    const isActive = sortBy === field;
    return (
      <th
        onClick={() => onSort && onSort(field)}
        className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider cursor-pointer select-none transition-colors ${
          isActive ? "text-blue-600 bg-blue-50/50" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <div className="flex items-center space-x-1.5">
          <span>{label}</span>
          {isActive && (
            order === "ASC" ? <FiArrowUp className="w-3.5 h-3.5" /> : <FiArrowDown className="w-3.5 h-3.5" />
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="w-full overflow-x-auto bg-white border border-slate-200/80 rounded-2xl shadow-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200/80">
            {renderSortHeader("title", "Task Title")}
            {renderSortHeader("status", "Status")}
            {renderSortHeader("priority", "Priority")}
            {renderSortHeader("dueDate", "Due Date")}
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned To</th>
            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50/60 transition-colors">
              <td className="px-6 py-4">
                <div
                  onClick={() => onView(task)}
                  className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer text-sm line-clamp-1"
                >
                  {task.title}
                </div>
                {task.description && (
                  <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{task.description}</div>
                )}
              </td>
              <td className="px-6 py-4">
                {!isAdmin && onStatusChange ? (
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    className="text-xs font-semibold py-1 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                ) : (
                  <TaskStatusBadge status={task.status} />
                )}
              </td>
              <td className="px-6 py-4">
                <TaskPriorityBadge priority={task.priority} />
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                {formatDate(task.dueDate)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {task.assignedToUser ? (
                  <div>
                    <div className="font-medium text-slate-800">{task.assignedToUser.name}</div>
                    <div className="text-xs text-slate-400">{task.assignedToUser.email}</div>
                  </div>
                ) : (
                  <span className="text-slate-400 text-xs italic">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4 text-right space-x-1">
                <button
                  onClick={() => onView(task)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors inline-block"
                  title="View Task"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                {isAdmin && (
                  <>
                    <button
                      onClick={() => onEdit(task)}
                      className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors inline-block"
                      title="Edit Task"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(task)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors inline-block"
                      title="Delete Task"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
