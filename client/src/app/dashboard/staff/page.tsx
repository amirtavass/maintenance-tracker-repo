"use client";

import { useState } from "react";
import { useTickets, Ticket } from "@/hooks/useTickets";
import RequestDetailsModal from "@/components/dashboard/staff/RequestDetailsModal";
import StaffSummarySection from "@/components/dashboard/staff/StaffSummarySection";
import TicketsFilterBar from "@/components/dashboard/staff/TicketsFilterBar";
import TicketsTable from "@/components/dashboard/staff/TicketsTable";

export default function StaffDashboard() {
  const {
    filteredTickets,
    summary,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    loading,
    updateTicketStatus,
  } = useTickets();

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <StaffSummarySection summary={summary} />

      {/* Filters */}
      <TicketsFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      {/* Tickets Table */}
      <TicketsTable
        tickets={filteredTickets}
        onViewDetails={handleViewDetails}
        onStatusChange={updateTicketStatus}
      />

      {/* Request Details Modal */}
      <RequestDetailsModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={updateTicketStatus}
      />
    </div>
  );
}
