import React, { useState } from 'react';
import DropDown from './ui/drop-down';
import LineChart from '../layouts/LineChart';

export default function DashboardLineChart() {
  const [selectedOption, setSelectedOption] = useState('Daily');

  return (
    <div className="flex h-full flex-col rounded bg-white p-4 font-inter shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-sm font-bold text-green-700 sm:text-lg">Progress Over Time</h1>

        <DropDown selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </div>
      <LineChart selectedOption={selectedOption} />
    </div>
  );
}
