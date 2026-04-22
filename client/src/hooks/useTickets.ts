import { useState, useEffect } from "react";

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
  createdBy: {
    name: string;
    email: string;
  };
}

export interface Summary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const ticketsArray = data.data?.tickets || [];
        setTickets(ticketsArray);
        calculateSummary(ticketsArray);
      } else {
        console.error("API Error:", response.status, response.statusText);
        setTickets([]);
        calculateSummary([]);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets([]);
      calculateSummary([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (ticketData: Ticket[]) => {
    if (!Array.isArray(ticketData)) {
      setSummary({ total: 0, pending: 0, inProgress: 0, completed: 0 });
      return;
    }

    const result = ticketData.reduce(
      (acc, ticket) => {
        acc.total++;
        switch (ticket.status) {
          case "open":
            acc.pending++;
            break;
          case "in-progress":
            acc.inProgress++;
            break;
          case "resolved":
            acc.completed++;
            break;
        }
        return acc;
      },
      { total: 0, pending: 0, inProgress: 0, completed: 0 },
    );
    setSummary(result);
  };

  const filterTickets = () => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.createdBy.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (ticket) => ticket.priority === priorityFilter,
      );
    }

    setFilteredTickets(filtered);
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5001/api/requests/${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        await fetchTickets();
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  };

  return {
    tickets,
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
    refetchTickets: fetchTickets,
  };
};
