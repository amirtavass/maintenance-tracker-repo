"use client";

import { useMemo, useState } from "react";

type RequestItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
  submitted: string;
  location: string;
};

const statusStyles: Record<string, string> = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Resolved: "bg-emerald-100 text-emerald-700",
};

export default function RequestTable({ requests }: { requests: RequestItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus = statusFilter === "All" || request.status === statusFilter;
      const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) || request.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [requests, searchQuery, statusFilter]);

  return (
    <section id="requests" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">My Requests</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Recent submissions</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search request ID or title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-72"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-56"
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-[0.16em]">Request</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-[0.16em]">Location</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-[0.16em]">Priority</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-[0.16em]">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-[0.16em]">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 text-slate-900">
                  <div className="font-semibold">{request.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{request.id}</div>
                </td>
                <td className="px-4 py-4 text-slate-600">{request.location}</td>
                <td className="px-4 py-4 text-slate-600">{request.priority}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[request.status]}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-600">{request.submitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No requests match your filters.
          </div>
        )}
      </div>
    </section>
  );
}
