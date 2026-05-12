"use client";

import AdminSidebar from '@/components/admin/AdminSidebar';
import { AuthProvider } from '@/context/AuthContext';
// Note: Apollo Provider and Toast notifications are not implemented in this example
// but this is where you would include them.

export default function AdminClientLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-gray-100">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
