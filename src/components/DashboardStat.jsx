import React from 'react';
import ProgressBar from '../layouts/ProgressBar';

export default function DashboardStat() {
  const PerformanceBreakdownData = [
    {
      label: 'Grammar',
      value: 76,
    },
    {
      label: 'Skills',
      value: 85,
    },
    {
      label: 'Experience',
      value: 90,
    },
    {
      label: 'Relevance',
      value: 90,
    },
  ];
  return (
    <>
      {/* Performance Breakdown */}
      <div className="grid h-auto w-full rounded bg-white p-4 font-inter shadow-sm">
        <h1 className="mb-2 text-lg font-bold text-green-700">Performance Breakdown</h1>
        <div className="grid auto-rows-auto gap-y-2 sm:gap-y-3">
          {PerformanceBreakdownData.map((item, index) => (
            <ProgressBar key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>

      {/* Interview Scores */}
      <div className="h-[150px] rounded bg-white p-4 shadow-sm">
        <h1 className="text-sm font-bold text-green-700 sm:text-lg">Interview Type Scores</h1>
      </div>
    </>
  );
}
