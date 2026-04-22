"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react"; // Using the library you just installed!

const navItems = [
  { label: "Overview", href: "/dashboard/student", hash: "" },
  {
    label: "My Requests",
    href: "/dashboard/student#requests",
    hash: "#requests",
  },
  {
    label: "Notifications",
    href: "/dashboard/student#notifications",
    hash: "#notifications",
  },
  { label: "Activity", href: "/dashboard/student#activity", hash: "#activity" },
  { label: "Profile", href: "/dashboard/student#profile", hash: "#profile" },
];

export default function Sidebar({
  onProfileClick,
}: {
  onProfileClick?: () => void;
}) {
  const router = useRouter();
  const [activeHash, setActiveHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );

  // 2. Only listen for changes going forward
  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login/student");
  };

  return (
    <aside className="hidden xl:flex xl:w-72 xl:flex-col xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto xl:py-8 xl:px-6 bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 transition-colors">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-semibold shadow-sm">
          ST
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-300">
            Student Maintenance Tracker
          </p>
          <p className="text-xs text-slate-400 dark:text-zinc-500">
            Student dashboard
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isProfile = item.label === "Profile";
          // Check if this item is the currently selected one
          const isActive =
            activeHash === item.hash || (activeHash === "" && item.hash === "");

          // We add dark mode variants (dark:...) to the classes
          const sharedClass = `block w-full text-left rounded-2xl px-4 py-3 text-sm font-medium transition ${
            isActive
              ? "bg-slate-900 text-white dark:bg-blue-600 shadow-sm"
              : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white"
          }`;

          return isProfile ? (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setActiveHash("#profile");
                if (onProfileClick) onProfileClick();
              }}
              className={sharedClass}
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveHash(item.hash)}
              className={sharedClass}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 mb-3">
            Tips
          </p>
          <div className="rounded-3xl bg-slate-50 dark:bg-zinc-900 p-4 text-sm text-slate-600 dark:text-zinc-400 border border-transparent dark:border-zinc-800">
            Submit issues quickly, track progress in real time, and keep your
            room manager informed.
          </div>
        </div>

        {/* New Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 dark:text-red-500 rounded-2xl transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </button>
      </div>
    </aside>
  );
}
