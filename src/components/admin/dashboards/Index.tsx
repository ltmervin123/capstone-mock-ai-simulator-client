import Cards from './Cards';
import Header from './Header';
import RecentActivity from './RecentActivity';
import StudentBarChart from './StudentBarChart';
import authStore from '@/stores/auth-store';
import { useGetDashboardStat } from '@/queries/admin/useDashboardStat';
export default function Index() {
  const user = authStore((state) => state.user);
  const {
    data: dashboardStats = {
      totalVerifiedStudents: 0,
      monthlyNewStudents: 0,
      totalPendingStudents: 0,
      dailyNewPendingStudents: 0,
      studentsCountsByProgram: {},
      authenticatedStudents: 0,
    },
    isLoading,
  } = useGetDashboardStat(user!);
  return (
    <div className="row-3 grid gap-6">
      <Header />
      <Cards dashboardStats={dashboardStats} isLoading={isLoading} />
      <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <RecentActivity />
        <StudentBarChart
          studentsCountsByProgram={dashboardStats.studentsCountsByProgram}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
