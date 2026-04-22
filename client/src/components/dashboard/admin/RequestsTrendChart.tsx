"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RequestTrendProps {
  data?: Array<{ day: string; requests: number }>;
}

const defaultData = [
  { day: "Mon", requests: 45 },
  { day: "Tue", requests: 52 },
  { day: "Wed", requests: 48 },
  { day: "Thu", requests: 65 },
  { day: "Fri", requests: 58 },
  { day: "Sat", requests: 72 },
  { day: "Sun", requests: 68 },
];

export default function RequestsTrendChart({ data = defaultData }: RequestTrendProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Requests Trend (Last 7 Days)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" />
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
          <Line
            type="monotone"
            dataKey="requests"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: "#3B82F6", r: 4 }}
            activeDot={{ r: 6 }}
            name="Total Requests"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
