import { useQuery } from '@tanstack/react-query';
import * as InterviewHistoryService from '@/services/student/interview-history-service';
import {
  InterviewClientDocument,
  InterviewHistory,
  InterviewHistoryFilterOption,
} from '@/types/student/interview-option-type';
import { User } from '@/types/auth/auth-type';

export const useGetInterviewHistory = (user: User, filterBy: InterviewHistoryFilterOption) => {
  return useQuery<InterviewHistory[], Error>({
    queryKey: ['interview-history', user, filterBy],
    queryFn: () => InterviewHistoryService.getInterviewHistory(filterBy),
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
