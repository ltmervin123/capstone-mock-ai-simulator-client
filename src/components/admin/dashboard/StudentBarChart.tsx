import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StudentBarChart(): JSX.Element {
  const data = useMemo(
    () => ({
      labels: ['BSIT', 'BSBA', 'BSCRIM'],
      datasets: [
        {
          label: 'Students',
          data: [60, 25, 40],
          borderRadius: 8,
          barThickness: 40,
          backgroundColor: '#15803d',
        },
      ],
    }),
    []
  );

  const options: ChartOptions<'bar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.y ?? context.parsed} students`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          grid: { display: false },
          beginAtZero: true,
          suggestedMax: 60,
        },
      },
    }),
    []
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Registered by Program</h3>
      </div>

      <div className="h-44">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
