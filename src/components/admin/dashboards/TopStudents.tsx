import { Skeleton } from '@/components/ui/skeleton';
import { TopInterviewPerformers } from '@/types/admin/dashboard-stat-type';
import { handleNameInitials, handleNames } from '@/utils/handle-names';
import { getProgramAcronym } from '@/utils/handle-programs';

type RecentActivityProps = {
  isLoading: boolean;
  topInterviewPerformers: TopInterviewPerformers[];
};

const getTopThreeStyles = (rank: number) => {
  if (rank === 1) {
    return {
      container: 'bg-yellow-50/50 border border-yellow-200/50 hover:bg-yellow-50',
      rank: 'text-yellow-600 font-bold',
      avatar: 'bg-yellow-600 ring-2 ring-yellow-200',
      score: 'text-yellow-700 font-bold',
    };
  }
  if (rank === 2) {
    return {
      container: 'bg-gray-50/50 border border-gray-200/50 hover:bg-gray-100',
      rank: 'text-gray-600 font-bold',
      avatar: 'bg-gray-600 ring-2 ring-gray-200',
      score: 'text-gray-700 font-bold',
    };
  }
  if (rank === 3) {
    return {
      container: 'bg-orange-50/50 border border-orange-200/50 hover:bg-orange-50',
      rank: 'text-orange-600 font-bold',
      avatar: 'bg-orange-600 ring-2 ring-orange-200',
      score: 'text-orange-700 font-bold',
    };
  }
  return {
    container: 'hover:bg-gray-50',
    rank: 'text-gray-400',
    avatar: 'bg-gray-900',
    score: 'text-gray-900 font-semibold',
  };
};

export default function TopStudents({ isLoading, topInterviewPerformers }: RecentActivityProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="mb-4 text-sm font-medium text-gray-900">Top Students</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2.5 w-24" />
              </div>
              <Skeleton className="h-4 w-10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-medium text-gray-900">Top Students</h3>

      <div className="h-[400px] overflow-y-auto">
        {topInterviewPerformers.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-400">No data available</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {topInterviewPerformers.map((student) => {
              const styles = getTopThreeStyles(student.rank);
              return (
                <li
                  key={student.rank}
                  className={`group flex items-center gap-3 rounded px-2 py-2.5 transition-colors ${styles.container}`}
                >
                  <span
                    className={`w-4 flex-shrink-0 text-center text-xs font-medium ${styles.rank}`}
                  >
                    {student.rank}
                  </span>

                  <div
                    aria-hidden
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium text-white ${styles.avatar}`}
                  >
                    {handleNameInitials(student.student)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {handleNames(student.student)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getProgramAcronym(student.program)} · {student.totalInterviews}{' '}
                      {student.totalInterviews === 1 ? 'interview' : 'interviews'}
                    </p>
                  </div>

                  <span className={`flex-shrink-0 text-base tabular-nums ${styles.score}`}>
                    {Math.round(student.averageScore)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
