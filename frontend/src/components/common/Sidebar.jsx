import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import {
  FiGrid,
  FiCheckSquare,
  FiTrash2,
  FiUser,
  FiX,
  FiShield,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: FiGrid,
    },
    {
      label: isAdmin ? "Manage Tasks" : "My Tasks",
      path: "/tasks",
      icon: FiCheckSquare,
    },
    ...(isAdmin
      ? [
          {
            label: "Trash / Deleted",
            path: "/tasks/deleted",
            icon: FiTrash2,
          },
        ]
      : []),
    {
      label: "User Profile",
      path: "/profile",
      icon: FiUser,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 w-64">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 lg:hidden">
        <span className="font-bold text-slate-800">Navigation Menu</span>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-2xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Core Modules
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose && onClose()}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer System Info */}
      <div className="p-4 m-4 bg-slate-50 border border-slate-100 rounded-2xl">
        <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold">
          <FiShield className="text-blue-600" />
          <span>TaskMaster v1.0 Production</span>
        </div>
        <p className="text-3xs text-slate-400 mt-1">Role-Based Access Protected</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 h-full w-64"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
