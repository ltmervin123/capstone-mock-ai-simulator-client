import { useQuery } from '@tanstack/react-query';
import * as BehavioralQuestionService from '@/services/student/behavioral-question-service';
import {
  BehavioralCategories,
  BehavioralQuestionData,
} from '@/types/behavioral-question/behavioral-question-type';

export const useGetBehavioralCategory = () => {
  return useQuery<BehavioralCategories[], Error>({
    queryKey: ['behavioral-categories'],
    queryFn: () => BehavioralQuestionService.getBehavioralCategories(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 50 * 60 * 1000,
  });
};

export const useGetBehavioralQuestion = (questionId: string) => {
  return useQuery<BehavioralQuestionData, Error>({
    queryKey: ['behavioral-question', questionId],
    queryFn: () => BehavioralQuestionService.getBehavioralQuestion(questionId),
    enabled: !!questionId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 50 * 60 * 1000,
  });
};
