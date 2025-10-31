import { useQuery } from '@tanstack/react-query';
import * as InterviewHistoryService from '@/services/student/interview-history-service';
import { InterviewClientDocument, InterviewHistory } from '@/types/student/interview-option-type';
import { User } from '@/types/auth/auth-type';

export const useGetInterviewHistory = (user: User) => {
  return useQuery<InterviewHistory[], Error>({
    queryKey: ['interview-history', user],
    queryFn: () => InterviewHistoryService.getInterviewHistory(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 50 * 60 * 1000,
  });
};

export const useGetInterviewDetail = (interviewId: string) => {
  return useQuery<InterviewClientDocument, Error>({
    queryKey: ['interview-detail', interviewId],
    queryFn: () => InterviewHistoryService.getInterviewDetail(interviewId),
    enabled: !!interviewId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 50 * 60 * 1000,
  });
};
