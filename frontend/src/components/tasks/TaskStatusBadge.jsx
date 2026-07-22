import React from "react";
import { getStatusBadgeStyle } from "../../utils/formatters.js";

export const TaskStatusBadge = ({ status }) => {
  const formattedStatus = status ? status.replace("_", " ") : "PENDING";
  const badgeStyle = getStatusBadgeStyle(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle} tracking-wide shadow-xs`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {formattedStatus}
    </span>
  );
};
