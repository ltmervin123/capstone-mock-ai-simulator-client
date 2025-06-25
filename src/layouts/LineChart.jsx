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

export default function LineChart({ selectedOption = 'Daily' }) {
  // Mock data for the chart
  const chartData = {
    label: 'Average Score',
    daily: {
      labels: ['1:00AM', '2:00AM', '3:00AM', '4:00AM', '5:00AM', '6:00AM', '7:00AM', '8:00AM'],
      data: [10, 8, 30, 40,30, 60, 70, 80],
    },
    weekly: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      data: [50, 60, 70, 80, 64, 100, 110],
    },
    monthly: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      data: [19, 30, 40, 50, 15, 70, 80, 90],
    },
  };

  const label = chartData.label;
  const data = chartData[selectedOption.toLocaleLowerCase()].data;
  const labels = chartData[selectedOption.toLocaleLowerCase()].labels;
  return (
    <div className="w-full flex-grow overflow-hidden">
      <Line options={getOptions()} data={getChartData({ data, label, labels })} />
    </div>
  );
}
