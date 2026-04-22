"use client";

import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/dashboard/student", active: true },
  { label: "My Requests", href: "/dashboard/student#requests", active: false },
  { label: "Notifications", href: "/dashboard/student#notifications", active: false },
  { label: "Activity", href: "/dashboard/student#activity", active: false },
  { label: "Profile", href: "/dashboard/student#profile", active: false },
];

export default function Sidebar({ onProfileClick }: { onProfileClick?: () => void }) {
  return (
    <aside className="hidden xl:flex xl:w-72 xl:flex-col xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto xl:py-8 xl:px-6 bg-white border-r border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-semibold shadow-sm">
          ST
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">Student Maintenance Tracker</p>
          <p className="text-xs text-slate-400">Student dashboard</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isProfile = item.label === "Profile";
          const sharedClass = `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
            item.active
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`;

          return isProfile ? (
            <button
              key={item.label}
              type="button"
              onClick={onProfileClick}
              className={sharedClass}
            >
              {item.label}
            </button>
          ) : (
            <Link key={item.label} href={item.href} className={sharedClass}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Tips</p>
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          Submit issues quickly, track progress in real time, and keep your room manager informed.
        </div>
      </div>
    </aside>
  );
}
