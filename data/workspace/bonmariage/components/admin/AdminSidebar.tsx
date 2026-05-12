"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <span className={`flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
        {children}
      </span>
    </Link>
  );
};

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);
const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
    </svg>
);


export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-screen bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <span className={`${isCollapsed ? 'hidden' : 'block'} text-xl font-bold`}>Admin</span>
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-lg hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <NavLink href="/admin/dashboard">
                <UserIcon />
                <span className={isCollapsed ? 'hidden' : 'block'}>Dashboard</span>
            </NavLink>
        </nav>
        {user && (
            <div className="p-4 border-t border-gray-700">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                    <img src="https://i.pravatar.cc/40" alt="Avatar" className="rounded-full" />
                    <div className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>
                        <p className="font-semibold">{user.name}</p>
                    </div>
                </div>
                <button onClick={logout} className={`w-full flex items-center mt-4 p-2 rounded-lg hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <LogoutIcon />
                    <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
                </button>
            </div>
        )}
    </div>
  );
}
