import DashboardHeader from './DashboardHeader';
import DashboardCards from './DashboardCards';
import DashboardLineChart from './DashboardLineChart';
import DashboardStat from './DashboardStat';
import DashBoardSkeleton from './Dashboardkeleton';
import authStore from '@/stores/public/auth-store';
import { useGetUserDashboardStats } from '@/queries/student/useDashboard';

export default function Index() {
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
