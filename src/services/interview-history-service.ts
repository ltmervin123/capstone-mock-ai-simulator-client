import { InterviewClientDocument, InterviewHistory } from '@/types/interview/interview-option-type';
import axiosClient from '../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/interview`;

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
