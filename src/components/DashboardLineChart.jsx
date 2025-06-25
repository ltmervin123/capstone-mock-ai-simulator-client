import React from 'react';
import DropDown from './ui/drop-down';
import LineChart from '../layouts/LineChart';

export default function DashboardLineChart() {
  return (
    <div className="flex h-full flex-col rounded bg-white p-4 font-inter shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-green-700">Progress Over Time</h1>

        <DropDown />
      </div>
      <LineChart />
    </div>
  );
}
