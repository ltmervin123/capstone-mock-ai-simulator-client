import { BehavioralCategory, BehavioralQuestionData } from '@/types/admin/question-type';
import axiosClient from '../../utils/axios';
import { BehavioralQuestionFormData } from '@/zod-schemas/admin/question-zod-schema';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/admin`;

export async function getBehavioralCategories(): Promise<BehavioralCategory[]> {
  const URL = `${BASE_URL}/behavioral-categories`;
  const response = await axiosClient.get(URL);
  return response.data.categories;
}

export async function getBehavioralCategory(categoryId: string): Promise<BehavioralQuestionData> {
  const URL = `${BASE_URL}/behavioral-category/${categoryId}`;
  const response = await axiosClient.get(URL);
  return response.data.category;
}

export async function updateBehavioralQuestion(
  categoryId: string,
  payload: BehavioralQuestionFormData
): Promise<void> {
  const URL = `${BASE_URL}/behavioral-category/${categoryId}`;
  await axiosClient.put(URL, payload);
}

export async function deleteBehavioralQuestion(categoryId: string): Promise<void> {
  const URL = `${BASE_URL}/behavioral-category/${categoryId}`;
  await axiosClient.delete(URL);
}

export async function updateBehavioralQuestionNumberToBeAnswered(
  categoryId: string,
  numberOfQuestions: number
): Promise<void> {
  const URL = `${BASE_URL}/behavioral-category/number-of-question/${categoryId}/${numberOfQuestions}`;
  await axiosClient.put(URL);
}

export async function addCategory(payload: BehavioralQuestionFormData): Promise<void> {
  const URL = `${BASE_URL}/behavioral-category`;
  await axiosClient.post(URL, payload);
}
