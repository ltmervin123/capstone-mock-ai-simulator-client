import { User } from '@/types/auth/auth-type';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as QuestionService from '@/services/admin/question-service';
import {
  BehavioralCategory,
  BehavioralQuestionData,
  QuestionConfig,
} from '@/types/admin/question-type';
import { BehavioralQuestionFormData } from '@/zod-schemas/admin/question-zod-schema';

export const useGetBehavioralCategories = (user: User) => {
  return useQuery<BehavioralCategory[], Error>({
    queryKey: ['behavioral-categories', user],
    queryFn: () => QuestionService.getBehavioralCategories(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useGetBehavioralCategory = (user: User, categoryId: string) => {
  return useQuery<BehavioralQuestionData, Error>({
    queryKey: ['behavioral-category', user, categoryId],
    queryFn: () => QuestionService.getBehavioralCategory(categoryId),
    enabled: !!user && !!categoryId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useUpdateBehavioralCategory = (options = {}, categoryId: string) => {
  return useMutation({
    mutationFn: (data: BehavioralQuestionFormData) =>
      QuestionService.updateBehavioralQuestion(categoryId, data),
    ...options,
  });
};

export const useDeleteBehavioralCategory = (options = {}, categoryId: string) => {
  return useMutation({
    mutationFn: () => QuestionService.deleteBehavioralQuestion(categoryId),
    ...options,
  });
};

export const useUpdateBehavioralQuestionNumberToBeAnswered = (options = {}) => {
  return useMutation({
    mutationFn: ({
      categoryId,
      numberOfQuestionToGenerate,
    }: {
      numberOfQuestionToGenerate: number;
      categoryId: string;
    }) =>
      QuestionService.updateBehavioralQuestionNumberToBeAnswered(
        categoryId,
        numberOfQuestionToGenerate
      ),
    ...options,
  });
};

export const AddBehavioralQuestion = (options = {}) => {
  return useMutation({
    mutationFn: (data: BehavioralQuestionFormData) => QuestionService.addCategory(data),
    ...options,
  });
};

export const useGetQuestionConfigs = (user: User) => {
  return useQuery<QuestionConfig[], Error>({
    queryKey: ['question-config', user],
    queryFn: () => QuestionService.getQuestionConfigs(),
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
};

export const useUpdateQuestionConfig = (options = {}) => {
  return useMutation({
    mutationFn: ({
      id,
      numberOfQuestionToGenerate,
    }: {
      numberOfQuestionToGenerate: number;
      id: string;
    }) => QuestionService.updateQuestionConfig(id, numberOfQuestionToGenerate),
    ...options,
  });
};
