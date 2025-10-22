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
import { ProgressOverTime } from '@/components/dashboard/DashboardLineChart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartProps = {
  selectedOption: string;
  progressOverTime?: ProgressOverTime;
};

export default function LineChart({ selectedOption, progressOverTime }: LineChartProps) {
  const label = 'Average Score';
  const data = progressOverTime?.[selectedOption as keyof ProgressOverTime]?.data || [];
  const labels = progressOverTime?.[selectedOption as keyof ProgressOverTime]?.labels || [];

  return (
    <div className="w-full flex-grow overflow-hidden">
      <Line options={getOptions()} data={getChartData({ data, label, labels })} />
    </div>
  );
}
