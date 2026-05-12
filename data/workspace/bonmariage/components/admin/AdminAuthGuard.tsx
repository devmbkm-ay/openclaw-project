"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminAuthGuard({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We are just simulating a check here.
    // In a real app, you might be verifying a token with an API.
    setTimeout(() => {
      if (!isAuthenticated || !isAdmin) {
        router.push('/admin/login');
      } else {
        setIsLoading(false);
      }
    }, 500); // Simulate a small delay for checking auth
  }, [isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
