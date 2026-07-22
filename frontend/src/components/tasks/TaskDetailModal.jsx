import React from "react";
import { Modal } from "../common/Modal.jsx";
import { TaskStatusBadge } from "./TaskStatusBadge.jsx";
import { TaskPriorityBadge } from "./TaskPriorityBadge.jsx";
import { formatDate } from "../../utils/formatters.js";
import { FiCalendar, FiUser, FiClock, FiCheckSquare } from "react-icons/fi";

export const TaskDetailModal = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Overview">
      <div className="space-y-6">
        {/* Status & Priority */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status:</span>
            <TaskStatusBadge status={task.status} />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority:</span>
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold text-slate-900">{task.title}</h3>
          <div className="mt-3 p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
            {task.description || "No description provided."}
          </div>
        </div>

        {/* Details Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <div className="p-2.5 bg-blue-100/60 text-blue-600 rounded-lg">
              <FiCalendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Due Date</p>
              <p className="text-sm font-semibold text-slate-800">{formatDate(task.dueDate)}</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-100/60 text-indigo-600 rounded-lg">
              <FiClock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Created At</p>
              <p className="text-sm font-semibold text-slate-800">{formatDate(task.createdAt)}</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <div className="p-2.5 bg-purple-100/60 text-purple-600 rounded-lg">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Assigned To</p>
              <p className="text-sm font-semibold text-slate-800">
                {task.assignedToUser ? task.assignedToUser.name : task.assignedTo || "Unassigned"}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-100/60 text-emerald-600 rounded-lg">
              <FiCheckSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Assigned By</p>
              <p className="text-sm font-semibold text-slate-800">
                {task.assignedByUser ? task.assignedByUser.name : task.assignedBy || "System Admin"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
