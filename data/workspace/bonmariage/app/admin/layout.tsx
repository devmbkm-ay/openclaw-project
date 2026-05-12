import AdminClientLayout from "./client-layout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for Bon Mariage RSVP',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AdminClientLayout>{children}</AdminClientLayout>
      </body>
    </html>
  )
}
