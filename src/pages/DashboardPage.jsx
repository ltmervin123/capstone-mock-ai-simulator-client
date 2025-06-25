import React from 'react';
import AppHeader from '../layouts/AppHeader';
import AppSidebar from '../layouts/AppSidebar';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden pt-24 md:pt-0">
        <div className="shrink-0 overflow-y-auto">
          <AppSidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
