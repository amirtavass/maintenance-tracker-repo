import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">
            Admin Portal
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard/admin"
            className="block px-4 py-2.5 rounded-md bg-purple-50 text-purple-700 font-medium dark:bg-purple-900/20 dark:text-purple-300 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/admin/users"
            className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 font-medium transition-colors"
          >
            Manage Users
          </Link>
          <Link
            href="/dashboard/admin/settings"
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