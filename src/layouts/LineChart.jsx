import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getOptions, getChartData } from '../utils/lineChart';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart() {
  return (
    <div className="w-full flex-grow overflow-hidden">
      <Line options={getOptions()} data={getChartData()} />
    </div>
  );
}
