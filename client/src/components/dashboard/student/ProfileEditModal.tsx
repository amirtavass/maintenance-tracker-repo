"use client";

import { FormEvent, useEffect, useState } from "react";

interface ProfileEditModalProps {
  open: boolean;
  initialValues: {
    phone: string;
    roomNumber: string;
    blockNumber: string;
    accommodation: string;
  };
  onClose: () => void;
  onSave: (data: {
    phone: string;
    roomNumber: string;
    blockNumber: string;
    accommodation: string;
  }) => Promise<void>;
}

export default function ProfileEditModal({ open, initialValues, onClose, onSave }: ProfileEditModalProps) {
  const [phone, setPhone] = useState(initialValues.phone);
  const [roomNumber, setRoomNumber] = useState(initialValues.roomNumber);
  const [blockNumber, setBlockNumber] = useState(initialValues.blockNumber);
  const [accommodation, setAccommodation] = useState(initialValues.accommodation);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setPhone(initialValues.phone);
      setRoomNumber(initialValues.roomNumber);
      setBlockNumber(initialValues.blockNumber);
      setAccommodation(initialValues.accommodation);
      setError("");
    }
  }, [open, initialValues]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSave({ phone, roomNumber, blockNumber, accommodation });
    } catch (err) {
      setError("Unable to update profile. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Edit profile</p>
            <h2 className="text-2xl font-semibold text-slate-900">Update your details</h2>
          </div>
          <button type="button" className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              Phone Number
              <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              Room Number
              <input
                type="text"
                value={roomNumber}
                onChange={(event) => setRoomNumber(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              Block Number
              <input
                type="text"
                value={blockNumber}
                onChange={(event) => setBlockNumber(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              Accommodation
              <input
                type="text"
                value={accommodation}
                onChange={(event) => setAccommodation(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
