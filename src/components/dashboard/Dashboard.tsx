import DashboardHeader from './DashboardHeader';
import DashboardCards from './DashboardCards';
import DashboardLineChart from './DashboardLineChart';
import DashboardStat from './DashboardStat';
import DashBoardSkeleton from './DashboardCardSkeleton';
import authStore from '@/stores/auth-store';
import { useGetUserDashboardStats } from '@/queries/useDashboard';

export default function Dashboard() {
  const user = authStore((state) => state.user);
  const { data: dashboardStats, isLoading } = useGetUserDashboardStats(user!);

  return (
    <div className="grid grid-cols-1 gap-6 font-inter">
      <DashboardHeader />

      {isLoading ? (
        <DashBoardSkeleton />
      ) : (
        <>
          <div className="grid min-h-[150px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCards
              interviewsCount={dashboardStats?.interviewsCount!}
              averageScores={dashboardStats?.averageScores!}
              highestScores={dashboardStats?.highestScores!}
            />
          </div>
          <div className="min-h-[250px] rounded">
            <DashboardLineChart progressOverTime={dashboardStats?.progressOverTime} />
          </div>
          <div className="grid min-h-[150px] grid-cols-1 gap-6 lg:grid-cols-2">
            <DashboardStat
              performanceBreakDown={dashboardStats?.performanceBreakDown}
              interviewTypeScores={dashboardStats?.interviewTypeScores}
            />
          </div>
        </>
      )}
    </div>
  );
}
