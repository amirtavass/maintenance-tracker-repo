"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ActivityTimeline from "@/components/dashboard/student/ActivityTimeline";
import ChartOverview from "@/components/dashboard/student/ChartOverview";
import Navbar from "@/components/dashboard/student/Navbar";
import NotificationsPanel from "@/components/dashboard/student/NotificationsPanel";
import ProfileCard from "@/components/dashboard/student/ProfileCard";
import ProfileEditModal from "@/components/dashboard/student/ProfileEditModal";
import RequestTable from "@/components/dashboard/student/RequestTable";
import Sidebar from "@/components/dashboard/student/Sidebar";
import SummaryCard from "@/components/dashboard/student/SummaryCard";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  roomNumber: string;
  status: string;
  createdAt: string;
  createdBy: { name: string; email: string };
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  roomNumber?: string;
  blockNumber?: string;
  accommodation?: string;
  phone?: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [requests, setRequests] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login/student");
      return;
    }
  }, [router]);

  const transformTickets = (tickets: Ticket[]) => {
    return tickets.map((ticket) => ({
      id: `REQ-${ticket._id.slice(-4)}`,
      title: ticket.title,
      status: ticket.status === "in-progress" ? "In Progress" : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1),
      priority: ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1),
      submitted: new Date(ticket.createdAt).toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : new Date(ticket.createdAt).toLocaleDateString(),
      location: `Room ${ticket.roomNumber}`,
    }));
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserProfile(data.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRequests(data.data?.tickets || []);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: {
    phone: string;
    roomNumber: string;
    blockNumber: string;
    accommodation: string;
  }) => {
    try {
      setProfileLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (response.ok) {
        setUserProfile(data.data.user);
        setIsEditingProfile(false);
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchRequests();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchRequests, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Total Requests",
      value: requests.length.toString(),
      delta: "+12% this month",
      description: "All active and historic reports",
      accentClass: "bg-slate-900",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7h18M9 3h6M9 21h6M5 11h14M5 15h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: requests.filter((r) => r.status === "open").length.toString(),
      delta: "Stable",
      description: "Awaiting technician review",
      accentClass: "bg-blue-600",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l2 2M6.343 6.343a9 9 0 1112.728 12.728 9 9 0 01-12.728-12.728z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "In Progress",
      value: requests.filter((r) => r.status === "in-progress").length.toString(),
      delta: "+7% this week",
      description: "Technicians are working on these",
      accentClass: "bg-amber-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4V4zm4 4h8M8 12h8M8 16h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Resolved",
      value: requests.filter((r) => r.status === "resolved").length.toString(),
      delta: "+19% since last month",
      description: "Issues that were completed",
      accentClass: "bg-emerald-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="xl:flex xl:min-h-screen">
        <Sidebar onProfileClick={() => setIsEditingProfile(true)} />
        <div className="flex-1">
          <Navbar studentName={userProfile?.name || "Loading..."} />
          <main className="px-6 py-6 xl:px-10 xl:py-8">
            <ProfileEditModal
              open={isEditingProfile}
              initialValues={{
                phone: userProfile?.phone || "",
                roomNumber: userProfile?.roomNumber || "",
                blockNumber: userProfile?.blockNumber || "",
                accommodation: userProfile?.accommodation || "",
              }}
              onClose={() => setIsEditingProfile(false)}
              onSave={updateProfile}
            />
            <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
              <div className="space-y-6">
                <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white shadow-xl overflow-hidden">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Welcome back</p>
                      <h2 className="mt-4 text-3xl font-semibold">{userProfile?.name || "Loading..."}</h2>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">
                        Manage your accommodation maintenance requests, get updates in real time, and keep your room comfortable without extra steps.
                      </p>
                    </div>
                    <Link href="/dashboard/student/new-request">
                      <button className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100">
                        Submit New Request
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-4">
                  {stats.map((card) => (
                    <SummaryCard key={card.label} {...card} />
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                  <ChartOverview />
                  <NotificationsPanel />
                </div>

                {loading ? (
                  <div className="text-center py-8">Loading requests...</div>
                ) : (
                  <RequestTable requests={transformTickets(requests)} />
                )}
              </div>

              <div className="space-y-6">
                {profileLoading ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-3xl bg-slate-200"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-slate-200 rounded"></div>
                          <div className="h-3 w-24 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-16 bg-slate-200 rounded-2xl"></div>
                          <div className="h-16 bg-slate-200 rounded-2xl"></div>
                        </div>
                        <div className="h-16 bg-slate-200 rounded-2xl"></div>
                      </div>
                    </div>
                  </div>
                ) : userProfile ? (
                  <ProfileCard
                    name={userProfile.name}
                    room={userProfile.roomNumber || "Not set"}
                    blockNumber={userProfile.blockNumber || "Not set"}
                    accommodation={userProfile.accommodation || "Not set"}
                    email={userProfile.email}
                    phone={userProfile.phone || "Not set"}
                  />
                ) : (
                  <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
                    <p className="text-red-600">Failed to load profile data</p>
                  </div>
                )}
                <ActivityTimeline />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
