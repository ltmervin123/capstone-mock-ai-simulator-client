import axiosClient from '../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/interview`;
import { type SpeakParams as SpeakParamsType } from '@/hooks/answer/useSpeak';

export async function textToSpeech(data?: SpeakParamsType) {
  const URL = `${BASE_URL}/text-to-speech`;
  const response = await axiosClient.post(URL, data);
  return response.data;
}
