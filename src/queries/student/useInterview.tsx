import { useMutation, useQuery } from '@tanstack/react-query';
import * as InterviewService from '@/services/student/interview-service';
import {
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

export const useExpertInterview = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => InterviewService.getExpertInterviewQuestions(data),
    ...options,
  });
};
