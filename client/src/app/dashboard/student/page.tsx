"use client";

import ActivityTimeline from "@/components/dashboard/student/ActivityTimeline";
import ChartOverview from "@/components/dashboard/student/ChartOverview";
import Navbar from "@/components/dashboard/student/Navbar";
import NotificationsPanel from "@/components/dashboard/student/NotificationsPanel";
import ProfileCard from "@/components/dashboard/student/ProfileCard";
import RequestTable from "@/components/dashboard/student/RequestTable";
import Sidebar from "@/components/dashboard/student/Sidebar";
import SummaryCard from "@/components/dashboard/student/SummaryCard";

export default function StudentDashboard() {
  const studentName = "Sophie Turner";
  const studentInfo = {
    name: "Sophie Turner",
    room: "214",
    accommodation: "Maple Hall",
    email: "sophie.turner@uni.edu",
    phone: "+44 7712 345678",
  };

  const requests = [
    {
      id: "REQ-2101",
      title: "Heater not warming in room",
      status: "In Progress",
      priority: "High",
      submitted: "Today",
      location: "Room 214",
    },
    {
      id: "REQ-2098",
      title: "Bathroom faucet leaking",
      status: "Open",
      priority: "Medium",
      submitted: "Yesterday",
      location: "Room 214",
    },
    {
      id: "REQ-2086",
      title: "Broken window latch",
      status: "Resolved",
      priority: "Low",
      submitted: "Apr 18",
      location: "Room 212",
    },
    {
      id: "REQ-2075",
      title: "Wi-Fi connection dropping",
      status: "In Progress",
      priority: "Medium",
      submitted: "Apr 16",
      location: "Common Area",
    },
  ];

  const stats = [
    {
      label: "Total Requests",
      value: "24",
      delta: "+12% this month",
      description: "All active and historic reports",
      accentClass: "bg-slate-900",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7h18M9 3h6M9 21h6M5 11h14M5 15h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: "6",
      delta: "Stable",
      description: "Awaiting technician review",
      accentClass: "bg-blue-600",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l2 2M6.343 6.343a9 9 0 1112.728 12.728 9 9 0 01-12.728-12.728z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "In Progress",
      value: "10",
      delta: "+7% this week",
      description: "Technicians are working on these",
      accentClass: "bg-amber-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4V4zm4 4h8M8 12h8M8 16h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Resolved",
      value: "8",
      delta: "+19% since last month",
      description: "Issues that were completed",
      accentClass: "bg-emerald-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="xl:flex xl:min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar studentName={studentName} />
          <main className="px-6 py-6 xl:px-10 xl:py-8">
            <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
              <div className="space-y-6">
                <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white shadow-xl overflow-hidden">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Welcome back</p>
                      <h2 className="mt-4 text-3xl font-semibold">{studentName}</h2>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">
                        Manage your accommodation maintenance requests, get updates in real time, and keep your room comfortable without extra steps.
                      </p>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100">
                      Submit New Request
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-4">
                  {stats.map((card) => (
                    <SummaryCard key={card.label} {...card} />
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                  <ChartOverview />
                  <NotificationsPanel />
                </div>

                <RequestTable requests={requests} />
              </div>

              <div className="space-y-6">
                <ProfileCard {...studentInfo} />
                <ActivityTimeline />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
