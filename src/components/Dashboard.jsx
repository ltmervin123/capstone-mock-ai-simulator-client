import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardCards from './DashboardCards';
import DashboardLineChart from './DashboardLineChart';

export default function Dashboard() {
  return (
    <div className="front-inter grid grid-cols-1 gap-6">
      {/* Header section */}
      <DashboardHeader />
      {/* Stats cards */}
      <div className="grid min-h-[150px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        <DashboardCards />
      </div>

      {/* Main content section */}
      <div className="min-h-[250px] rounded">
        <DashboardLineChart />
      </div>

      {/* Bottom section */}
      <div className="grid min-h-[150px] grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="h-[150px] rounded bg-white p-4 shadow-sm"></div>
        <div className="h-[150px] rounded bg-white p-4 shadow-sm"></div>
      </div>
    </div>
  );
}
