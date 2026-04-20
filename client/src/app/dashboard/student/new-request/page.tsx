"use client";

import { useRouter } from "next/navigation";
import NewRequestForm from "@/components/dashboard/student/NewRequestForm";

export default function NewRequestPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push("/dashboard/student")}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Submit New Request</h1>
          <p className="text-slate-600 mt-2">Report a maintenance issue in your accommodation.</p>
        </div>
        <NewRequestForm />
      </div>
    </div>
  );
}