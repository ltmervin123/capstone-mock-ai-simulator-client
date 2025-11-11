import { DashboardStatsType } from '@/types/admin/dashboard-stat-type';
import { Skeleton } from '@/components/ui/skeleton';

type CardProps = {
  dashboardStats: DashboardStatsType;
  isLoading: boolean;
};

export default function Cards({ dashboardStats, isLoading }: CardProps) {
  if (isLoading) {
    return (
      <section className="rounded-md bg-emerald-50" aria-label="dashboard summary">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800">Total Registered Students</h3>
            <Skeleton className="mb-4 mt-2 h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </article>

          <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800">Pending Verification</h3>
            <Skeleton className="mb-4 mt-2 h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </article>

          <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800">Online Students</h3>
            <Skeleton className="mt-2 h-8 w-1/3" />
            <div className="mt-6 text-sm text-gray-500">&nbsp;</div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-md bg-emerald-50" aria-label="dashboard summary">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Total Registered Students</h3>
          <div className="mt-2 text-3xl font-extrabold leading-none text-black">
            {dashboardStats.totalVerifiedStudents}
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-full border border-green-100 bg-green-50 px-2.5 py-1 font-semibold text-green-700">
              +{dashboardStats.monthlyNewStudents}
            </span>
            <span className="text-gray-500">Since last month</span>
          </div>
        </article>

        <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Pending Verification</h3>
          <div className="mt-2 text-3xl font-extrabold leading-none text-black">
            {dashboardStats.totalPendingStudents}
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-2.5 py-1 font-semibold text-red-700">
              +{dashboardStats.dailyNewPendingStudents}
            </span>
            <span className="text-gray-500">Since yesterday</span>
          </div>
        </article>

        <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Online Students</h3>
          <div className="mt-2 text-3xl font-extrabold leading-none text-black">
            {dashboardStats.authenticatedStudents}
          </div>
          <div className="mt-6 text-sm text-gray-500">&nbsp;</div>
        </article>
      </div>
    </section>
  );
}
