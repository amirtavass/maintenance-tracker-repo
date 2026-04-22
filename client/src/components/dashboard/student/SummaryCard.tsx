"use client";

export default function SummaryCard({
  label,
  value,
  delta,
  description,
  icon,
  accentClass,
}: {
  label: string;
  value: string;
  delta: string;
  description: string;
  icon: React.ReactNode;
  accentClass: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className={`h-12 w-12 rounded-2xl ${accentClass} flex items-center justify-center text-white shadow`}>{icon}</div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{description} • <span className="font-semibold text-slate-700">{delta}</span></p>
    </div>
  );
}
