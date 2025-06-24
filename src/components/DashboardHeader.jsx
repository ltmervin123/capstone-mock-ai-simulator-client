import React from 'react';

export default function DashboardHeader() {
  return (
    <div className="grid">
      <div className="grid-cols-1 grid-rows-1">
        <h1 className="text-center text-3xl font-bold sm:text-left">Interview Analytics</h1>
        <p className="text-center text-gray-500 sm:text-left">
          Track your progress and identify areas for improvement
        </p>
      </div>
    </div>
  );
}
