import { useState } from 'react';
import DropDown from '../ui/drop-down';
import LineChart from '../../layouts/LineChart';
const OPTIONS = ['Daily', 'Weekly', 'Monthly'];

export type ProgressOverTime = {
  daily: {
    labels: string[];
    data: number[];
  };
  weekly: {
    labels: string[];
    data: number[];
  };
  monthly: {
    labels: string[];
    data: number[];
  };
};

export type DashboardLineChartProps = {
  progressOverTime?: ProgressOverTime;
};

export default function DashboardLineChart({ progressOverTime }: DashboardLineChartProps) {
  const [selectedOption, setSelectedOption] = useState('Daily');

  return (
    <div className="flex h-full flex-col rounded bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-sm font-bold text-green-700 sm:text-lg">Progress Over Time</h1>

        <DropDown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={OPTIONS}
        />
      </div>
      <LineChart
        selectedOption={selectedOption.toLowerCase()}
        progressOverTime={progressOverTime}
      />
    </div>
  );
}
