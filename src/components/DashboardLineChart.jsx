import React from 'react';
import DropDown from './ui/drop-down';

export default function DashboardLineChart() {
  return (
    <div className="h-full rounded bg-white p-4 font-inter shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-green-700">Progress Over Time</h1>

        {/* Custom Dropdown */}
        <DropDown />
      </div>

      {/* Chart content would go here */}
      <div className="flex h-full items-center justify-center text-gray-500">
        Chart displaying progress over time would be rendered here.
      </div>
    </div>
  );
}
