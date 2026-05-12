"use client";

import { useEffect, useState } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

// Define a type for the RSVP object for better TypeScript support
type Rsvp = {
  id: number;
  name: string;
  email: string;
  attending: boolean;
  meal: string | null;
  message: string | null;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/rsvp');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRsvps(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRsvps();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Loading responses...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }

    if (rsvps.length === 0) {
        return <p className="text-center text-gray-500">No responses yet.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attending</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rsvps.map((rsvp) => (
              <tr key={rsvp.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rsvp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rsvp.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {rsvp.attending ? 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span> : 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">No</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rsvp.meal || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rsvp.message || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <AdminAuthGuard>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to the admin dashboard. Here are the latest RSVPs.</p>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">RSVP Responses</h2>
          <div className="mt-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
