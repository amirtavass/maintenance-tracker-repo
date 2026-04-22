'use client';

import Link from "next/link";
import { Bell, User, LogOut, Home, ClipboardList, CheckCircle, Clock, Settings, HelpCircle } from "lucide-react";

export default function StaffDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-green-600 dark:text-green-400">
            Maintenance Tracker
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Staff Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard/staff"
            className="flex items-center px-4 py-2.5 rounded-md bg-green-50 text-green-700 font-medium dark:bg-green-900/20 dark:text-green-300 transition-colors"
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/staff/requests"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            <ClipboardList className="w-5 h-5 mr-3" />
            All Requests
          </Link>
          <Link
            href="/dashboard/staff/assigned"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            <User className="w-5 h-5 mr-3" />
            Assigned Requests
          </Link>
          <Link
            href="/dashboard/staff/in-progress"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            <Clock className="w-5 h-5 mr-3" />
            In Progress
          </Link>
          <Link
            href="/dashboard/staff/resolved"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            <CheckCircle className="w-5 h-5 mr-3" />
            Resolved
          </Link>
          <Link
            href="/dashboard/staff/notifications"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </Link>
          <Link
            href="/dashboard/staff/profile"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            <User className="w-5 h-5 mr-3" />
            Staff Profile
          </Link>
          <Link
            href="/dashboard/staff/help"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            Help / Support
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login/staff";
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Staff Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-md transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Staff Member</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}