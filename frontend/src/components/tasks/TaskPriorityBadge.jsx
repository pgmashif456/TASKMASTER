import React from "react";
import { getPriorityBadgeStyle } from "../../utils/formatters.js";

export const TaskPriorityBadge = ({ priority }) => {
  const badgeStyle = getPriorityBadgeStyle(priority);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${badgeStyle}`}
    >
      {priority || "LOW"}
    </span>
  );
};
