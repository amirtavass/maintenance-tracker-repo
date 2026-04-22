import React, { ReactNode } from "react";

interface StaffSummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  bgColor: string;
}

export default function StaffSummaryCard({
  title,
  value,
  icon,
  bgColor,
}: StaffSummaryCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`p-2 ${bgColor} rounded-lg`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
