"use client";

const overview = [
  { label: "Open", value: 24, color: "bg-blue-500" },
  { label: "In Progress", value: 16, color: "bg-amber-500" },
  { label: "Resolved", value: 34, color: "bg-emerald-500" },
];

export default function ChartOverview() {
  return (
    <section className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-200">
            Overview
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
            Request overview
          </h2>
        </div>
        <span className="rounded-full bg-slate-50 dark:bg-zinc-950 px-3 py-2 text-sm text-slate-600 dark:text-zinc-300">
          Last 30 days
        </span>
      </div>
      <div className="mt-6 space-y-4">
        {overview.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-zinc-300">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="mt-2 h-3 w-full rounded-full bg-slate-100 dark:bg-zinc-950">
              <div
                className={`${item.color} h-3 rounded-full`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
