// Dashboard analytics and statistics utilities

export interface DashboardStats {
  totalStudents: number;
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  resolvedRequests: number;
  highPriorityRequests: number;
  activeStaff: number;
  resolutionRate: number;
}

export interface RequestData {
  id: string;
  student: string;
  room: string;
  block: string;
  issue: string;
  category: string;
  priority: string;
  staff: string;
  date: string;
  status: string;
  submittedDate?: Date;
}

export interface StaffPerformanceData {
  id: number;
  name: string;
  assigned: number;
  resolved: number;
  inProgress: number;
  completionRate: number;
}

// Get chart data for requests by status
export const getRequestsByStatusData = (stats: DashboardStats) => {
  return {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        data: [stats.pendingRequests, stats.inProgressRequests, stats.resolvedRequests],
        backgroundColor: ["#FCA5A5", "#93C5FD", "#86EFAC"],
        borderColor: ["#DC2626", "#3B82F6", "#22C55E"],
        borderWidth: 2,
      },
    ],
  };
};

// Get chart data for requests by category
export const getRequestsByCategoryData = () => {
  return {
    labels: ["Plumbing", "Electrical", "HVAC", "Hardware", "Structural", "Cleaning"],
    datasets: [
      {
        data: [234, 189, 156, 142, 98, 76],
        backgroundColor: [
          "#3B82F6",
          "#FBBF24",
          "#06B6D4",
          "#A855F7",
          "#F87171",
          "#10B981",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };
};

// Calculate trend percentage
export const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

// Get request status distribution
export const getStatusDistribution = (stats: DashboardStats) => {
  const total = stats.totalRequests;
  return {
    pending: ((stats.pendingRequests / total) * 100).toFixed(1),
    inProgress: ((stats.inProgressRequests / total) * 100).toFixed(1),
    resolved: ((stats.resolvedRequests / total) * 100).toFixed(1),
  };
};

// Get time-based request trends
export const getRequestTrendData = () => {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Requests",
        data: [45, 52, 48, 65, 58, 72, 68],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};
