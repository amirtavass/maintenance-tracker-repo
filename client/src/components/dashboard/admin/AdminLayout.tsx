"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";
import AdminNavbar from "@/components/dashboard/admin/AdminNavbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-zinc-950" />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-72">
        {/* Navbar */}
        <AdminNavbar adminName="Admin" />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
