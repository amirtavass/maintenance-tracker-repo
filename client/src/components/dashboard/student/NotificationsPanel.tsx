"use client";

const notifications = [
  {
    title: "Request update available",
    message: "Your room heater repair has been moved to In Progress.",
    time: "10 mins ago",
  },
  {
    title: "Maintenance completed",
    message: "Your broken window request was resolved.",
    time: "1 day ago",
  },
  {
    title: "New maintenance tip",
    message: "Report water leaks immediately to avoid damage.",
    time: "2 days ago",
  },
];

export default function NotificationsPanel() {
  return (
    <section
      id="notifications"
      className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-200">
            Notifications
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Latest updates
          </h2>
        </div>
        <button className="rounded-2xl bg-slate-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-slate-800 transition">
          Mark all read
        </button>
      </div>
      <div className="mt-5 space-y-4">
        {notifications.map((note) => (
          <div
            key={note.title}
            className="rounded-3xl border border-slate-200  dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950  p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-900">{note.title}</h3>
              <span className="text-xs text-slate-500 dark:text-white">
                {note.time}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white">
              {note.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
