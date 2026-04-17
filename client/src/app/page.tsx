'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Maintenance Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A comprehensive maintenance tracking system with role-based access control.
            Manage tasks, track progress, and ensure accountability across your organization.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Role-Based Access
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Students:</strong> View assigned tasks</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Staff:</strong> Manage tasks and track progress</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Admins:</strong> Full system access and user management</span>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <Link
              href="/login"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-block bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
            <p className="text-gray-600">JWT-based authentication ensures secure access to your data.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Role-Based Access</h3>
            <p className="text-gray-600">Different permission levels for students, staff, and administrators.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Management</h3>
            <p className="text-gray-600">Track maintenance tasks, assign responsibilities, and monitor progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
