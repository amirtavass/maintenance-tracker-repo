"use client";

import Link from "next/link";
import ThemeToggle from "@/components/UI/ThemeToggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  // Helper function to get active styling
  const getActiveStyle = (href: string, role?: string) => {
    if (!isActive(href)) return "";

    const roleColors = {
      student:
        "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400",
      staff:
        "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400",
      admin:
        "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400",
      register:
        "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400",
      about:
        "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400",
    };

    return roleColors[role as keyof typeof roleColors] || "";
  };

  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`font-bold text-xl text-[#1e3b8a] dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors ${
                isActive("/") &&
                !pathname?.includes("login") &&
                !pathname?.includes("register")
                  ? "border-b-2 border-blue-600 dark:border-blue-400"
                  : ""
              }`}
            >
              MaintenanceTracker
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/login/student"
                className={`pb-2 text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${getActiveStyle(
                  "/login/student",
                  "student",
                )}`}
              >
                Student
              </Link>
              <Link
                href="/login/staff"
                className={`pb-2 text-gray-700 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-400 transition-colors ${getActiveStyle(
                  "/login/staff",
                  "staff",
                )}`}
              >
                Staff
              </Link>
              <Link
                href="/login/admin"
                className={`pb-2 text-gray-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${getActiveStyle(
                  "/login/admin",
                  "admin",
                )}`}
              >
                Admin
              </Link>
              <Link
                href="/register/student"
                className={`pb-2 text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${getActiveStyle(
                  "/register/student",
                  "register",
                )}`}
              >
                Register
              </Link>
              <Link
                href="/"
                className={`pb-2 text-gray-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors`}
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Right side - Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 dark:border-zinc-800 pt-4">
          <Link
            href="/login/student"
            className={`block py-2 text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${getActiveStyle(
              "/login/student",
              "student",
            )}`}
          >
            Student
          </Link>
          <Link
            href="/login/staff"
            className={`block py-2 text-gray-700 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-400 transition-colors ${getActiveStyle(
              "/login/staff",
              "staff",
            )}`}
          >
            Staff
          </Link>
          <Link
            href="/login/admin"
            className={`block py-2 text-gray-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${getActiveStyle(
              "/login/admin",
              "admin",
            )}`}
          >
            Admin
          </Link>
          <Link
            href="/register/student"
            className={`block py-2 text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${getActiveStyle(
              "/register/student",
              "register",
            )}`}
          >
            Register
          </Link>
          <Link
            href="#about"
            className="block py-2 text-gray-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            About Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
