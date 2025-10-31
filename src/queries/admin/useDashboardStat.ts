import { User } from '@/types/auth/auth-type';
import { useQuery } from '@tanstack/react-query';
import { DashboardStatsType } from '@/types/admin/dashboard-stat';
import * as DashboardService from '@/services/admin/dashboard-stat';
export const useGetDashboardStat = (user: User) => {
  return useQuery<DashboardStatsType, Error>({
    queryKey: ['dashboard-stats', user],
    queryFn: () => DashboardService.getDashboardStat(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};
