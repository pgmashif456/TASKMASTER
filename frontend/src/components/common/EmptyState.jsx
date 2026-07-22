import React from "react";
import { FiInbox } from "react-icons/fi";
import { motion } from "framer-motion";

export const EmptyState = ({
  title = "No items found",
  description = "There are no records to display right now.",
  actionButton = null,
  icon: Icon = FiInbox,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl shadow-sm my-4"
    >
      <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl mb-4">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionButton}
    </motion.div>
  );
};
