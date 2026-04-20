"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// 1. We extract the form into its own component so it can use useSearchParams safely
function StudentLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Captures errors passed in the URL (e.g., ?error=unauthorized)
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccess(message);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        router.push("/dashboard/student");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
      <div className="relative">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute -top-4 -left-4 text-sm text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <span>&larr;</span> Back to Home
        </Link>

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#1e3b8a]">
          Student Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Sign in to access your maintenance dashboard
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder="david@student.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Display both API errors and URL errors */}
        {(() => {
          const safeUrlError =
            urlError === "invalid_credentials"
              ? "Invalid email or password."
              : urlError === "session_expired"
                ? "Your session has expired. Please sign in again."
                : urlError === "unauthorized"
                  ? "You must sign in to continue."
                  : ""; // Ignores any random text a hacker tries to inject

          const displayError = error || safeUrlError;

          return displayError ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700">{displayError}</p>
            </div>
          ) : null;
        })()}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? "Verifying Credentials..." : "Sign in"}
          </button>
        </div>

        <div className="text-center">
          <Link
            href="/register/student"
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Don&apos;t have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function StudentLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="text-[#1e3b8a] font-semibold animate-pulse">
            Loading login portal...
          </div>
        }
      >
        <StudentLoginForm />
      </Suspense>
    </main>
  );
}
