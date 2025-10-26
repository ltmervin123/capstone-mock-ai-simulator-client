import axiosClient from '../../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/interview`;

export async function getUnViewedInterviewsCount(): Promise<number> {
  const URL = `${BASE_URL}/un-viewed-interviews-count`;
  const response = await axiosClient.get(URL);
  return response.data.count;
}

export async function updateUnViewedInterviewsCount(interviewId: string): Promise<void> {
  const URL = `${BASE_URL}/mark-as-viewed/${interviewId}`;
  await axiosClient.put(URL);
}
