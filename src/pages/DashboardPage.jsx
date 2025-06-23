import React from 'react';
import AppHeader from '../layouts/AppHeader';
import AppSidebar from '../layouts/AppSidebar';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <div>
          <AppSidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
