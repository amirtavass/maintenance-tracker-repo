"use client";

const timeline = [
  {
    title: "Request assigned to technician",
    description: "Your heater issue has been assigned and is scheduled for inspection.",
    date: "Today, 09:15 AM",
    status: "In Progress",
  },
  {
    title: "New request submitted",
    description: "You submitted a new maintenance request for a room heater issue.",
    date: "Yesterday, 08:40 PM",
    status: "Open",
  },
  {
    title: "Request resolved",
    description: "The window repair request was completed and marked resolved.",
    date: "2 days ago",
    status: "Resolved",
  },
];

const statusClasses = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Resolved: "bg-emerald-100 text-emerald-700",
};

export default function ActivityTimeline() {
  return (
    <section id="activity" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Activity</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">Request progress</h2>
      </div>
      <div className="mt-6 space-y-6">
        {timeline.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-slate-300" />
            <div className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[item.status as keyof typeof statusClasses]}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
