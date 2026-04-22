"use client";

interface BarChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  height?: number;
}

export default function BarChart({ title, data, height = 300 }: BarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-3" style={{ height: `${height}px` }}>
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-24 text-sm text-slate-600 truncate">{item.label}</div>
            <div className="flex-1">
              <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color || "#3b82f6",
                  }}
                />
              </div>
            </div>
            <div className="w-12 text-sm font-medium text-slate-900 text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}