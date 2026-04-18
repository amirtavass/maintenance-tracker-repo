import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 w-full min-h-screen bg-white">
      <div className="text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-[#1e3b8a] mb-4">
          Maintenance Tracker
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Welcome to the Student Accommodation Maintenance Portal.
        </p>

        <div className="flex items-center justify-center gap-x-6">
          <Link
            href="/login/student"
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            Student Login
          </Link>
          <Link
            href="/login/staff"
            className="rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors"
          >
            Staff Login
          </Link>
          <Link
            href="/login/admin"
            className="rounded-md bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </main>
  );
}
