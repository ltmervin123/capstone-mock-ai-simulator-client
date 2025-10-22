import {
  GenerateInterviewFeedbackPayload,
  InterviewClientDocument,
  InterviewHistory,
  type FollowUpQuestionParams,
  type GreetingParams,
  type DashboardStats,
} from '@/types/interview/interview-option-type';
import axiosClient from '../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/interview`;
import { type SpeakParams } from '@/hooks/answer/useSpeak';

export async function textToSpeech(data: SpeakParams) {
  const URL = `${BASE_URL}/text-to-speech`;
  const response = await axiosClient.post(URL, data);
  return response.data;
}

export async function greetingResponse(data: GreetingParams) {
  const URL = `${BASE_URL}/greeting-response`;
  const response = await axiosClient.post(URL, data);
  return response.data.greetingResponse;
}

export async function followUpQuestions(data: FollowUpQuestionParams) {
  const URL = `${BASE_URL}/follow-up-question`;
  const response = await axiosClient.post(URL, data);
  return response.data.followUpQuestion;
}

export async function makeInterviewFeedback(data: GenerateInterviewFeedbackPayload) {
  const URL = `${BASE_URL}/make-interview-feedback`;
  const response = await axiosClient.post(URL, data);
  return response.data;
}

export async function getInterviewHistory(): Promise<InterviewHistory[]> {
  const URL = `${BASE_URL}/history`;
  const response = await axiosClient.get(URL);
  return response.data.interviewHistory;
}

export async function getInterviewDetail(interviewId: string): Promise<InterviewClientDocument> {
  const URL = `${BASE_URL}/${interviewId}`;
  const response = await axiosClient.get(URL);
  return response.data.interviewDetail;
}

export async function getExpertInterviewQuestions(data: FormData): Promise<string[]> {
  const URL = `${BASE_URL}/upload-resume`;
  const response = await axiosClient.post(URL, data);
  return response.data.questions;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const URL = `${BASE_URL}/dashboard-stats`;
  const response = await axiosClient.get(URL);
  return response.data.dashboardStats;
}
