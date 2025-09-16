import DashboardHeader from './DashboardHeader';
import DashboardCards from './DashboardCards';
import DashboardLineChart from './DashboardLineChart';
import DashboardStat from './DashboardStat';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 font-inter">
      <DashboardHeader />

      <div className="grid min-h-[150px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCards />
      </div>
      <div className="min-h-[250px] rounded">
        <DashboardLineChart />
      </div>

      <div className="grid min-h-[150px] grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardStat />
      </div>
    </div>
  );
}
