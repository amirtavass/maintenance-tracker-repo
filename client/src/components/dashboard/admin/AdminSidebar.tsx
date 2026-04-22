"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  UserCheck,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "All Requests", href: "/dashboard/admin/requests", icon: FileText },
  { label: "Students", href: "/dashboard/admin/students", icon: Users },
  { label: "Staff", href: "/dashboard/admin/staff", icon: UserCheck },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
];

const otherItems = [
  { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30 lg:bg-white dark:lg:bg-zinc-900 lg:border-r lg:border-gray-200 dark:lg:border-zinc-800">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold">
            M
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500 dark:text-zinc-400">Maintenance Tracker</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-6 space-y-8">
        <div className="space-y-1">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Main</h3>
          <ul role="list" className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`group flex gap-x-3 rounded-lg px-4 py-3 text-sm font-medium leading-6 transition ${
                      active
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {item.label}
                    {active && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-1">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Other</h3>
          <ul role="list" className="space-y-1">
            {otherItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`group flex gap-x-3 rounded-lg px-4 py-3 text-sm font-medium leading-6 transition ${
                      active
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {item.label}
                    {active && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}