"use client";

export default function ProfileCard({
  name,
  room,
  blockNumber,
  accommodation,
  email,
  phone,
}: {
  name: string;
  room: string;
  blockNumber: string;
  accommodation: string;
  email: string;
  phone: string;
}) {
  return (
    <div id="profile" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-2xl font-semibold text-white shadow-sm">
          {name.split(" ").map((part) => part[0]).join("")}
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Student profile</p>
          <h2 className="text-xl font-semibold text-slate-900">{name}</h2>
          <p className="text-sm text-slate-500">
            {accommodation} • Block {blockNumber} • Room {room}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">Email<div className="mt-2 font-semibold text-slate-900">{email}</div></div>
          <div className="rounded-2xl bg-slate-50 p-4">Phone<div className="mt-2 font-semibold text-slate-900">{phone}</div></div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-slate-500">Next scheduled update</p>
          <p className="mt-2 font-semibold text-slate-900">Within 24 hours</p>
        </div>
      </div>
    </div>
  );
}
