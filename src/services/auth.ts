import axiosClient from '../utils/axios';
import { type SignupFormData as SignupType } from '../zod-schemas/sign-up';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/auth`;

export async function signup(data: SignupType) {
  const URL = `${BASE_URL}/signup`;
  return axiosClient.post(URL, data);
}
