import { useMutation, useQuery } from '@tanstack/react-query';
import * as InterviewService from '@/services/student/interview-service';
import {
  FollowUpQuestionParams,
  GenerateInterviewFeedbackPayload,
  QuestionConfig,
  type GreetingParams,
} from '@/types/student/interview-option-type';
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

export const useExpertInterview = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => InterviewService.getExpertInterviewQuestions(data),
    ...options,
  });
};

export const useGetQuestionConfigs = (user: User) => {
  return useQuery<QuestionConfig[], Error>({
    queryKey: ['question-config', user],
    queryFn: () => InterviewService.getQuestionConfig(),
    enabled: !!user,
    staleTime: 3 * 60 * 1000,
    refetchInterval: 3 * 60 * 1000,
    refetchOnWindowFocus: 'always',
  });
};
