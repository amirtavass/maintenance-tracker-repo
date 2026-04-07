export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-blue-900">
          Maintenance Tracker
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Welcome to the Student Accommodation Maintenance Portal.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
            Report an Issue
          </button>
          <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
            Admin Login <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
