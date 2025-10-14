import { useQuery, useMutation } from '@tanstack/react-query';
import { greetingResponse, followUpQuestions } from '@/services/interview-service';
import {
  FollowUpQuestionParams,
  type GreetingParams,
} from '@/types/interview/interview-option-type';
export const useGreetingResponse = (options = {}) => {
  return useMutation({
    mutationFn: (data: GreetingParams) => greetingResponse(data),
    ...options,
  });
};

export const useBasicInterviewFollowUpQuestions = (options = {}) => {
  return useMutation({
    mutationFn: (data: FollowUpQuestionParams) => followUpQuestions(data),
    ...options,
  });
};
