import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { FiUser, FiMail, FiShield, FiKey, FiLogOut, FiCalendar } from "react-icons/fi";
import { formatDate } from "../utils/formatters.js";
import { motion } from "framer-motion";

export const Profile = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="pb-2 border-b border-slate-200/80">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">User Account Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          View your registered credentials and role authorization privileges.
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-blue-500/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{user?.name || "User"}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
                  isAdmin
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {user?.role || "STUDENT"}
              </span>
            </div>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        {/* Profile Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <FiUser className="text-blue-600" />
              <span>Full Name</span>
            </div>
            <p className="text-base font-semibold text-slate-800">{user?.name}</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <FiMail className="text-blue-600" />
              <span>Email Address</span>
            </div>
            <p className="text-base font-semibold text-slate-800">{user?.email}</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <FiShield className="text-indigo-600" />
              <span>User Role</span>
            </div>
            <p className="text-base font-semibold text-slate-800">{user?.role}</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <FiKey className="text-indigo-600" />
              <span>User ID (UUID)</span>
            </div>
            <p className="text-xs font-mono font-semibold text-slate-700 truncate select-all">
              {user?.id}
            </p>
          </div>
        </div>

        {/* Logout Section */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">JWT Token active in secure browser storage.</p>
          <button
            onClick={logout}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
