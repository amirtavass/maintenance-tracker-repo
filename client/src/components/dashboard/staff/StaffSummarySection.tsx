import React from "react";
import { Clock, CheckCircle } from "lucide-react";
import StaffSummaryCard from "./StaffSummaryCard";
import { Summary } from "@/hooks/useTickets";

interface StaffSummarySectionProps {
  summary: Summary;
}

export default function StaffSummarySection({
  summary,
}: StaffSummarySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StaffSummaryCard
        title="Total Requests"
        value={summary.total}
        icon={<Clock className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-100"
      />
      <StaffSummaryCard
        title="Pending"
        value={summary.pending}
        icon={<Clock className="w-6 h-6 text-yellow-600" />}
        bgColor="bg-yellow-100"
      />
      <StaffSummaryCard
        title="In Progress"
        value={summary.inProgress}
        icon={<Clock className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-100"
      />
      <StaffSummaryCard
        title="Completed"
        value={summary.completed}
        icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-100"
      />
    </div>
  );
}
