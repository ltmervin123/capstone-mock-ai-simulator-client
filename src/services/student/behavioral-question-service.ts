import {
  BehavioralCategories,
  BehavioralQuestionData,
} from '@/types/student/behavioral-question-type';
import axiosClient from '../../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/behavioral-questions`;

export async function getBehavioralCategories(): Promise<BehavioralCategories[]> {
  const URL = `${BASE_URL}`;
  const response = await axiosClient.get(URL);
  return response.data.categories;
}

export async function getBehavioralQuestion(questionId: string): Promise<BehavioralQuestionData> {
  const URL = `${BASE_URL}/${questionId}`;
  const response = await axiosClient.get(URL);
  return response.data.questionData;
}
