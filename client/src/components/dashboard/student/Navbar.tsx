"use client";

import ThemeToggle from "@/components/UI/ThemeToggle";
export default function DashboardNavbar({
  studentName,
}: {
  studentName: string;
}) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-5 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 shadow-sm">
      <div>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Welcome back,
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {studentName}
        </h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-72">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-zinc-200">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3.5a4.5 4.5 0 104.5 4.5A4.505 4.505 0 008 3.5zm0 8a3.5 3.5 0 113.5-3.5A3.504 3.504 0 018 11.5z" />
              <path d="M12.93 12.94a6 6 0 111.414-1.414l4.243 4.243-1.414 1.414-4.243-4.243z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search requests"
            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 py-3 pl-10 pr-4 text-sm text-slate-700 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white dark:text-slate-800 shadow-sm hover:bg-slate-800 transition">
          View Notifications
        </button>
      </div>
    </header>
  );
}
