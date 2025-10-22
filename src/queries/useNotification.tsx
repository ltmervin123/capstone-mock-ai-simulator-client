import { useQuery, useMutation } from '@tanstack/react-query';
import * as NotificationService from '@/services/notification-service';
import { User } from '@/types/auth/auth-type';

export const useGetUnViewedInterviewCount = (user: User) => {
  return useQuery<number, Error>({
    queryKey: ['un-viewed-interview-count', user],
    queryFn: () => NotificationService.getUnViewedInterviewsCount(),
    enabled: !!user,
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
  });
};

export const updateUnViewedInterviewCount = (options = {}) => {
  return useMutation({
    mutationFn: (data: { interviewId: string }) =>
      NotificationService.updateUnViewedInterviewsCount(data.interviewId),
    ...options,
  });
};
