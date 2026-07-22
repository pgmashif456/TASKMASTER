import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-12 h-12 bg-slate-200 rounded-xl" />
        <div className="w-16 h-6 bg-slate-200 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-5 bg-slate-200 rounded-md" />
        <div className="w-1/2 h-4 bg-slate-200 rounded-md" />
      </div>
    </div>
  );
};

export const SkeletonTableRow = () => {
  return (
    <tr className="animate-pulse border-b border-slate-100">
      <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-36"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-16"></div></td>
    </tr>
  );
};

export const SkeletonGrid = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
