import React from "react";
import { Outlet } from "react-router-dom";
import { FiCheckSquare } from "react-icons/fi";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col justify-center items-center p-4 sm:p-6">
      {/* SaaS Brand Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/30">
          <FiCheckSquare className="w-8 h-8" />
        </div>
        <span className="text-3xl font-black text-white tracking-tight">
          TaskMaster
        </span>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8">
        <Outlet />
      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} TaskMaster Inc. Secure Role-Based Architecture.
      </div>
    </div>
  );
};
