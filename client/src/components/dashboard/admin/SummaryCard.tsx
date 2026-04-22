"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  description?: string;
  color?: "blue" | "green" | "orange" | "red" | "purple";
}

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
  purple: "from-purple-500 to-purple-600",
};

export default function SummaryCard({
  title,
  value,
  icon,
  trend,
  description,
  color = "blue",
}: SummaryCardProps) {
  return (
    <div className="summary-card bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 p-6">
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-zinc-400">
          {title}
        </h3>
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>

      {/* Trend and Description */}
      <div className="flex items-center justify-between">
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}