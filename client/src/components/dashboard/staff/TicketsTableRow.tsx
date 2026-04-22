import React from "react";
import { Eye } from "lucide-react";
import { Ticket } from "@/hooks/useTickets";
import { getStatusBadge, getPriorityColor } from "@/utils/badgeUtils";

interface TicketsTableRowProps {
  ticket: Ticket;
  onViewDetails: (ticket: Ticket) => void;
  onStatusChange: (ticketId: string, newStatus: string) => void;
}

export default function TicketsTableRow({
  ticket,
  onViewDetails,
  onStatusChange,
}: TicketsTableRowProps) {
  const statusBadge = getStatusBadge(ticket.status);
  const priorityColor = getPriorityColor(ticket.priority);
  const StatusIcon = statusBadge.icon;

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-zinc-400">
          {ticket.title}
        </div>
        <div className="text-sm text-gray-500 dark:text-white truncate max-w-xs">
          {ticket.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-zinc-400">
          {ticket.createdBy.name}
        </div>
        <div className="text-sm text-gray-500 dark:text-white">
          {ticket.createdBy.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColor}`}
        >
          {ticket.priority.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
        >
          {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
          {statusBadge.label}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(ticket.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:text-blue-900 transition"
            onClick={() => onViewDetails(ticket)}
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {ticket.status === "open" && (
            <button
              className="text-green-600 hover:text-green-900"
              onClick={() => onStatusChange(ticket._id, "in-progress")}
            >
              Start
            </button>
          )}
          {ticket.status === "in-progress" && (
            <button
              className="text-green-600 hover:text-green-900"
              onClick={() => onStatusChange(ticket._id, "resolved")}
            >
              Complete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
