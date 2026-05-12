// app/providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// This is a client-side component that wraps the app in a SessionProvider
// to make session data available throughout the application.

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
