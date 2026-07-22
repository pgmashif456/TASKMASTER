import React from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { FiMenu, FiUser, FiLogOut, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Navbar = ({ onToggleSidebar }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 glass-header border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        <Link to="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl shadow-md group-hover:scale-105 transition-transform">
            <FiCheckSquare className="w-5 h-5" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 bg-clip-text text-transparent tracking-tight">
            TaskMaster
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Role Badge */}
        <span
          className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-2xs ${
            isAdmin
              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          {user?.role || "USER"}
        </span>

        {/* Profile Dropdown Link */}
        <Link
          to="/profile"
          className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-100/80 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name || "User"}</p>
            <p className="text-xs text-slate-400">{user?.email || ""}</p>
          </div>
        </Link>

        {/* Logout Quick Button */}
        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Logout"
        >
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
