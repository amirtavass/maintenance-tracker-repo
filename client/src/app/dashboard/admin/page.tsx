"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";
import SummaryCard from "@/components/dashboard/admin/SummaryCard";
import RequestsByStatusChart from "@/components/dashboard/admin/RequestsByStatusChart";
import RequestsByCategoryChart from "@/components/dashboard/admin/RequestsByCategoryChart";
import RequestsTrendChart from "@/components/dashboard/admin/RequestsTrendChart";
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 245,
    totalRequests: 1284,
    pendingRequests: 234,
    inProgressRequests: 456,
    resolvedRequests: 594,
    highPriorityRequests: 42,
    activeStaff: 18,
    resolutionRate: 86,
  });

  const [recentRequests, setRecentRequests] = useState([
    {
      id: "REQ001",
      student: "Ahmed Hassan",
      room: "A-201",
      block: "Block A",
      issue: "Broken tap in bathroom",
      category: "Plumbing",
      priority: "High",
      staff: "Mohammad Ali",
      date: "2 hours ago",
      status: "In Progress",
    },
    {
      id: "REQ002",
      student: "Fatima Ahmed",
      room: "B-105",
      block: "Block B",
      issue: "Light bulb not working",
      category: "Electrical",
      priority: "Low",
      staff: "Sara Johnson",
      date: "4 hours ago",
      status: "Resolved",
    },
    {
      id: "REQ003",
      student: "Ali Mohamed",
      room: "C-315",
      block: "Block C",
      issue: "Door lock damaged",
      category: "Hardware",
      priority: "High",
      staff: "Unassigned",
      date: "6 hours ago",
      status: "Pending",
    },
    {
      id: "REQ004",
      student: "Leila Khan",
      room: "A-410",
      block: "Block A",
      issue: "AC not cooling",
      category: "HVAC",
      priority: "Medium",
      staff: "Ahmed Khan",
      date: "8 hours ago",
      status: "In Progress",
    },
    {
      id: "REQ005",
      student: "Omar Ibrahim",
      room: "D-205",
      block: "Block D",
      issue: "Water leakage from ceiling",
      category: "Structural",
      priority: "Urgent",
      staff: "Mohammed Hassan",
      date: "10 hours ago",
      status: "In Progress",
    },
  ]);

  const [staffPerformance] = useState([
    {
      id: 1,
      name: "Mohammad Ali",
      assigned: 28,
      resolved: 24,
      inProgress: 4,
      completionRate: 86,
    },
    {
      id: 2,
      name: "Sara Johnson",
      assigned: 22,
      resolved: 20,
      inProgress: 2,
      completionRate: 91,
    },
    {
      id: 3,
      name: "Ahmed Khan",
      assigned: 31,
      resolved: 27,
      inProgress: 4,
      completionRate: 87,
    },
    {
      id: 4,
      name: "Mohammed Hassan",
      assigned: 19,
      resolved: 15,
      inProgress: 4,
      completionRate: 79,
    },
  ]);

  const [urgentIssues] = useState([
    {
      id: "URGENT-001",
      title: "Water leakage from ceiling - Block D",
      student: "Omar Ibrahim",
      days: 2,
      priority: "Urgent",
    },
    {
      id: "URGENT-002",
      title: "Door lock damaged - Block C (Security Risk)",
      student: "Ali Mohamed",
      days: 1,
      priority: "High",
    },
    {
      id: "URGENT-003",
      title: "Electrical fault in common area - Block B",
      student: "Multiple",
      days: 3,
      priority: "Urgent",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      case "High":
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "Low":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-72">
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 h-20 flex items-center px-6">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Welcome back, Admin
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
                <AlertCircle size={20} className="text-gray-600 dark:text-zinc-400" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-8 space-y-8">
            {/* Summary Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard
                title="Total Students"
                value={stats.totalStudents}
                icon={<Users size={24} />}
                color="blue"
                trend={12}
                description="Registered students"
              />
              <SummaryCard
                title="Total Requests"
                value={stats.totalRequests}
                icon={<FileText size={24} />}
                color="green"
                trend={8}
                description="All time requests"
              />
              <SummaryCard
                title="Pending Requests"
                value={stats.pendingRequests}
                icon={<Clock size={24} />}
                color="orange"
                trend={-3}
                description="Awaiting assignment"
              />
              <SummaryCard
                title="Resolved Requests"
                value={stats.resolvedRequests}
                icon={<CheckCircle size={24} />}
                color="green"
                trend={15}
                description="Completed requests"
              />
            </section>

            {/* Key Metrics Row */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard
                title="In Progress"
                value={stats.inProgressRequests}
                icon={<TrendingUp size={24} />}
                color="blue"
                description="Currently being worked on"
              />
              <SummaryCard
                title="High Priority Issues"
                value={stats.highPriorityRequests}
                icon={<AlertCircle size={24} />}
                color="red"
                trend={5}
                description="Require attention"
              />
              <SummaryCard
                title="Resolution Rate"
                value={`${stats.resolutionRate}%`}
                icon={<CheckCircle size={24} />}
                color="green"
                trend={2}
                description="Success rate"
              />
            </section>

            {/* Analytics Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RequestsByStatusChart
                pending={stats.pendingRequests}
                inProgress={stats.inProgressRequests}
                resolved={stats.resolvedRequests}
              />
              <RequestsByCategoryChart />
            </section>

            {/* Request Trend Chart */}
            <section>
              <RequestsTrendChart />
            </section>

            {/* Recent Requests Table */}
            <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Requests
                </h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 text-sm"
                    />
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 text-sm">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Room
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Issue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Staff
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                    {recentRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {request.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                          {request.student}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                          {request.room}, {request.block}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                          {request.issue}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
                            {request.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                          {request.staff}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                          {request.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Staff Performance & Urgent Issues */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
              {/* Staff Performance */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Staff Performance
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-zinc-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                          Staff Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                          Assigned
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                          Resolved
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase">
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                      {staffPerformance.map((staff) => (
                        <tr
                          key={staff.id}
                          className="hover:bg-gray-50 dark:hover:bg-zinc-800"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {staff.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                            {staff.assigned}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                            {staff.resolved}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${staff.completionRate}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {staff.completionRate}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Urgent Issues Alert */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-600" />
                    Urgent Issues
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {urgentIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {issue.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">
                            Reported by {issue.student}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                          {issue.days} day{issue.days > 1 ? "s" : ""} pending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}