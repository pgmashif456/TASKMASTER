import React from "react";
import { motion } from "framer-motion";

export const StatCard = ({ title, count, icon: Icon, color = "blue", subtitle }) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50 text-blue-600 border-blue-100",
      accent: "bg-blue-600",
    },
    amber: {
      bg: "bg-amber-50 text-amber-600 border-amber-100",
      accent: "bg-amber-500",
    },
    indigo: {
      bg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      accent: "bg-indigo-600",
    },
    emerald: {
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "bg-emerald-600",
    },
    purple: {
      bg: "bg-purple-50 text-purple-600 border-purple-100",
      accent: "bg-purple-600",
    },
  };

  const currentTheme = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all overflow-hidden group"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${currentTheme.accent}`} />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-800 mt-2 tracking-tight">
            {count !== undefined ? count : 0}
          </h3>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3.5 rounded-2xl border ${currentTheme.bg} transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
