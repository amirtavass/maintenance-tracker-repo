"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";

interface AdvancedFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  status: string;
  priority: string;
  category: string;
  dateRange: string;
}

const statuses = ["All", "Pending", "In Progress", "Resolved"];
const priorities = ["All", "Urgent", "High", "Medium", "Low"];
const categories = [
  "All",
  "Plumbing",
  "Electrical",
  "HVAC",
  "Hardware",
  "Structural",
  "Cleaning",
];

export default function AdvancedFilter({ onFilterChange }: AdvancedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "All",
    priority: "All",
    category: "All",
    dateRange: "all",
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      status: "All",
      priority: "All",
      category: "All",
      dateRange: "all",
    });
    onFilterChange?.({
      search: "",
      status: "All",
      priority: "All",
      category: "All",
      dateRange: "all",
    });
  };

  const isFiltered =
    filters.search ||
    filters.status !== "All" ||
    filters.priority !== "All" ||
    filters.category !== "All" ||
    filters.dateRange !== "all";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, student name, or issue..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Filter size={18} />
          Filters
        </button>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange({ status: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white text-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase mb-2">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange({ priority: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white text-sm"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange({ category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange({ dateRange: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {isFiltered && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm">
              Search: {filters.search}
              <button
                onClick={() => handleFilterChange({ search: "" })}
                className="ml-1 hover:opacity-70"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.status !== "All" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm">
              {filters.status}
              <button
                onClick={() => handleFilterChange({ status: "All" })}
                className="ml-1 hover:opacity-70"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.priority !== "All" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm">
              {filters.priority}
              <button
                onClick={() => handleFilterChange({ priority: "All" })}
                className="ml-1 hover:opacity-70"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.category !== "All" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm">
              {filters.category}
              <button
                onClick={() => handleFilterChange({ category: "All" })}
                className="ml-1 hover:opacity-70"
              >
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
