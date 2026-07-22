import React from "react";
import { FiLoader } from "react-icons/fi";

export const Loader = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-4 h-4 text-sm",
    md: "w-8 h-8 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <FiLoader className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );
};

export const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
    <div className="p-6 bg-white shadow-xl rounded-2xl flex flex-col items-center space-y-3">
      <FiLoader className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-sm font-semibold text-slate-700">Loading TaskMaster...</p>
    </div>
  </div>
);
