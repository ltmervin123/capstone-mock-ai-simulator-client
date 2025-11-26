import {
  GenerateInterviewFeedbackPayload,
  QuestionConfig,
  type FollowUpQuestionParams,
  type GreetingParams,
} from '@/types/student/interview-option-type';
import axiosClient from '../../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/interview`;
import { type SpeakParams } from '@/hooks/student/answer/useSpeak';

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

export async function getExpertInterviewQuestions(data: FormData): Promise<string[]> {
  const URL = `${BASE_URL}/upload-resume`;
  const response = await axiosClient.post(URL, data);
  return response.data.questions;
}

export async function getQuestionConfig(): Promise<QuestionConfig[]> {
  const URL = `${BASE_URL}/question-config`;
  const response = await axiosClient.get(URL);
  return response.data.questionConfig;
}

export async function sanitizedTranscription(transcription: string): Promise<string> {
  const URL = `${BASE_URL}/sanitized-transcription`;
  const response = await axiosClient.post(URL, { transcription });
  return response.data.sanitizedText;
}
