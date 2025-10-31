import { useMemo } from 'react';
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
type StudentBarChartProps = {
  studentsCountsByProgram: Record<string, number>;
  isLoading: boolean;
};
export default function StudentBarChart({
  studentsCountsByProgram,
  isLoading,
}: StudentBarChartProps) {
  const course = Object.keys(studentsCountsByProgram);
  const count = course.map((key) => studentsCountsByProgram[key]);

  const data = {
    labels: course,
    datasets: [
      {
        label: 'Students',
        data: count,
        borderRadius: 8,
        barThickness: 40,
        backgroundColor: '#15803d',
      },
    ],
  };

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
          ticks: {
            stepSize: 1,
            precision: 0,
          },
        },
      },
    }),
    []
  );

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="h-6 w-1/2 animate-pulse rounded-lg bg-gray-200"></span>
        </div>
        <div className="flex h-44 items-end gap-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="w-8 animate-pulse rounded-lg bg-gray-200"
                style={{
                  height: `${40 + Math.random() * 40}px`,
                }}
              />
              <span className="mt-2 h-4 w-12 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Registered by Program</h3>
      </div>
      <div className="h-44">
        {course.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            No data available
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
}
