import { Clock, CheckCircle } from "lucide-react";

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    open: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    "in-progress": { color: "bg-blue-100 text-blue-800", icon: Clock },
    resolved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  if (!config) {
    return {
      color: "bg-gray-100 text-gray-800",
      icon: null,
      label: status.toUpperCase(),
    };
  }

  return {
    color: config.color,
    icon: config.icon,
    label: status.replace("-", " ").toUpperCase(),
  };
};

export const getPriorityColor = (priority: string) => {
  const priorityConfig = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    priorityConfig[priority as keyof typeof priorityConfig] ||
    "bg-gray-100 text-gray-800"
  );
};
