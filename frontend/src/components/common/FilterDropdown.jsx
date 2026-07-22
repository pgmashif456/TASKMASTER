import React from "react";
import { FiFilter } from "react-icons/fi";

export const FilterDropdown = ({
  label,
  value,
  onChange,
  options = [],
  icon: Icon = FiFilter,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {label && <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer shadow-xs"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
