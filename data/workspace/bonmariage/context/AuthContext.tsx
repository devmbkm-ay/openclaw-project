"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // In a real app, you'd verify credentials
    setUser({ name: 'Admin User', ...userData });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  // For this example, we'll just check if the user is logged in
  const isAdmin = !!user; 

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
