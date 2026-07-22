import React from "react";
import { Link } from "react-router-dom";
import { FiShieldOff, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export const Unauthorized = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6"
    >
      <div className="p-5 bg-rose-50 text-rose-600 rounded-3xl mb-6 shadow-sm">
        <FiShieldOff className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">403 - Access Denied</h1>
      <p className="text-slate-500 mt-2 max-w-md text-sm">
        You do not have administrative permissions to view this module. Please return to your designated dashboard.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex items-center space-x-2 px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-2xl shadow-md hover:bg-blue-700 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </motion.div>
  );
};
