import React from 'react';

export default function DashboardHeader() {
  return (
    <div className="grid">
      <div className="grid-cols-1 grid-rows-1 text-center font-inter md:text-left">
        <h1 className="text-3xl font-bold">Interview Analytics</h1>
        <p className="text-gray-500">Track your progress and identify areas for improvement</p>
      </div>
    </div>
  );
}
