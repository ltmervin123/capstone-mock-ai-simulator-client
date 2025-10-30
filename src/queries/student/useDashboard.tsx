import { useQuery } from '@tanstack/react-query';
import * as DashboardService from '@/services/student/dashboard-service';
import { DashboardStats } from '@/types/interview/interview-option-type';
import { User } from '@/types/auth/auth-type';

export const useGetUserDashboardStats = (user: User) => {
  return useQuery<DashboardStats, Error>({
    queryKey: ['user-dashboard-stats', user],
    queryFn: () => DashboardService.getDashboardStats(),
    enabled: !!user,
    staleTime: 3 * 60 * 1000,
    refetchInterval: 3 * 60 * 1000,
  });
};
