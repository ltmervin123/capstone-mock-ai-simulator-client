import React from 'react';
import AppHeader from '../layouts/AppHeader';
import AppSidebar from '../layouts/AppSidebar';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col bg-green-50">
      <AppHeader />

      <div className="flex min-h-screen flex-1 overflow-hidden pt-24">
        <div>
          <AppSidebar />
        </div>

        <div className="min-h-screen flex-1 overflow-hidden p-4">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
