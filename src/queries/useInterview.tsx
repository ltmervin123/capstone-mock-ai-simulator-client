import { useMutation, useQuery } from '@tanstack/react-query';
import * as InterviewService from '@/services/interview-service';
import {
  DashboardStats,
  ExpertInterviewPayload,
  FollowUpQuestionParams,
  GenerateInterviewFeedbackPayload,
  InterviewClientDocument,
  InterviewHistory,
  type GreetingParams,
} from '@/types/interview/interview-option-type';
import { User } from '@/types/auth/auth-type';
export const useGreetingResponse = (options = {}) => {
  return useMutation({
    mutationFn: (data: GreetingParams) => InterviewService.greetingResponse(data),
    ...options,
  });
};

export const useBasicInterviewFollowUpQuestions = (options = {}) => {
  return useMutation({
    mutationFn: (data: FollowUpQuestionParams) => InterviewService.followUpQuestions(data),
    ...options,
  });
};

export const useMakeInterviewFeedback = (options = {}) => {
  return useMutation({
    mutationFn: (data: GenerateInterviewFeedbackPayload) =>
      InterviewService.makeInterviewFeedback(data),
    ...options,
  });
};

export const useGetInterviewHistory = (user: User) => {
  return useQuery<InterviewHistory[], Error>({
    queryKey: ['interview-history', user],
    queryFn: () => InterviewService.getInterviewHistory(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 50 * 60 * 1000,
  });
};

export const useGetInterviewDetail = (interviewId: string) => {
  return useQuery<InterviewClientDocument, Error>({
    queryKey: ['interview-detail', interviewId],
    queryFn: () => InterviewService.getInterviewDetail(interviewId),
    enabled: !!interviewId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 50 * 60 * 1000,
  });
};

export const useExpertInterview = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => InterviewService.getExpertInterviewQuestions(data),
    ...options,
  });
};

export const useGetUserDashboardStats = (user: User) => {
  return useQuery<DashboardStats, Error>({
    queryKey: ['user-dashboard-stats', user],
    queryFn: () => InterviewService.getDashboardStats(),
    enabled: !!user,
    staleTime: 3 * 60 * 1000,
    refetchInterval: 3 * 60 * 1000,
  });
};
