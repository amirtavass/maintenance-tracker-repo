"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RequestsByCategoryProps {
  data?: Array<{ category: string; count: number }>;
}

const defaultData = [
  { category: "Plumbing", count: 234 },
  { category: "Electrical", count: 189 },
  { category: "HVAC", count: 156 },
  { category: "Hardware", count: 142 },
  { category: "Structural", count: 98 },
  { category: "Cleaning", count: 76 },
];

export default function RequestsByCategoryChart({
  data = defaultData,
}: RequestsByCategoryProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Requests by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="category" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
              color: "#f3f4f6",
            }}
          />
          <Legend />
          <Bar dataKey="count" fill="#3B82F6" name="Number of Requests" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
