import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <main className="lg:ml-80 min-h-screen  ">
        {children}
      </main>
    </div>
  );
}