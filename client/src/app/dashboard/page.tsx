'use client';

import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const [protectedData, setProtectedData] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Test protected routes based on user role
    const testProtectedRoutes = async () => {
      try {
        // All users can access student area
        const studentData = await apiService.getProtectedData('student');
        setProtectedData({ student: studentData });

        // Try staff area if user is staff or admin
        if (user?.role === 'staff' || user?.role === 'admin') {
          const staffData = await apiService.getProtectedData('staff');
          setProtectedData(prev => ({ ...prev, staff: staffData }));
        }

        // Try admin area if user is admin
        if (user?.role === 'admin') {
          const adminData = await apiService.getProtectedData('admin');
          setProtectedData(prev => ({ ...prev, admin: adminData }));
        }
      } catch (err) {
        setError('Some protected routes are not accessible');
      }
    };

    testProtectedRoutes();
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">User Information</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> <span className="capitalize">{user?.role}</span></p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Protected Routes Access</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {protectedData?.student && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                  <h3 className="font-medium text-green-800">✅ Student Area</h3>
                  <p className="text-green-700">{protectedData.student.message}</p>
                </div>
              )}

              {protectedData?.staff && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                  <h3 className="font-medium text-blue-800">✅ Staff Area</h3>
                  <p className="text-blue-700">{protectedData.staff.message}</p>
                </div>
              )}

              {protectedData?.admin && (
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-md">
                  <h3 className="font-medium text-purple-800">✅ Admin Area</h3>
                  <p className="text-purple-700">{protectedData.admin.message}</p>
                </div>
              )}

              {!protectedData?.staff && (user?.role === 'staff' || user?.role === 'admin') && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                  <h3 className="font-medium text-yellow-800">⚠️ Staff Area Access Issue</h3>
                  <p className="text-yellow-700">Check your authentication token</p>
                </div>
              )}

              {!protectedData?.admin && user?.role === 'admin' && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                  <h3 className="font-medium text-yellow-800">⚠️ Admin Area Access Issue</h3>
                  <p className="text-yellow-700">Check your authentication token</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Role-Based Access Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Student Role</h3>
                <p className="text-sm text-gray-600 mt-1">Can access: Student area only</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Staff Role</h3>
                <p className="text-sm text-gray-600 mt-1">Can access: Student + Staff areas</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Admin Role</h3>
                <p className="text-sm text-gray-600 mt-1">Can access: All areas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}