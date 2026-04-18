import Link from "next/link";

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
            Staff Portal
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard/staff"
            className="block px-4 py-2.5 rounded-md bg-green-50 text-green-700 font-medium dark:bg-green-900/20 dark:text-green-300 transition-colors"
          >
            All Tickets
          </Link>
          <Link
            href="/dashboard/staff/settings"
            className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <button className="w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}