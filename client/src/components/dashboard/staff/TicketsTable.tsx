import React from "react";
import { Ticket } from "@/hooks/useTickets";
import TicketsTableRow from "./TicketsTableRow";

interface TicketsTableProps {
  tickets: Ticket[];
  onViewDetails: (ticket: Ticket) => void;
  onStatusChange: (ticketId: string, newStatus: string) => void;
}

export default function TicketsTable({
  tickets,
  onViewDetails,
  onStatusChange,
}: TicketsTableProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Maintenance Requests
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-zinc-700">
            {tickets.map((ticket) => (
              <TicketsTableRow
                key={ticket._id}
                ticket={ticket}
                onViewDetails={onViewDetails}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tickets found matching your criteria.
        </div>
      )}
    </div>
  );
}
