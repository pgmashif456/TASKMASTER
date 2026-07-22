import React from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

export const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6"
    >
      <div className="p-5 bg-amber-50 text-amber-600 rounded-3xl mb-6 shadow-sm">
        <FiAlertCircle className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">404 - Page Not Found</h1>
      <p className="text-slate-500 mt-2 max-w-md text-sm">
        The route you are trying to access does not exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex items-center space-x-2 px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-2xl shadow-md hover:bg-blue-700 transition-colors"
      >
        <FiHome className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>
    </motion.div>
  );
};
