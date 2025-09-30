import axiosClient from '../utils/axios';
import { type SignupFormData as SignupType } from '../zod-schemas/sign-up-zod-schema';
import { type SigninPayload as SigninType } from '../zod-schemas/sign-in-zod-schema';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/auth`;

export async function signup(data: SignupType) {
  const URL = `${BASE_URL}/signup`;
  return axiosClient.post(URL, data);
}

export async function verifyStudentEmail(token: string) {
  const URL = `${BASE_URL}/verify-email/${token}`;
  return axiosClient.post(URL);
}

export async function signin(data: SigninType) {
  const URL = `${BASE_URL}/signin`;
  return axiosClient.post(URL, data);
}

export async function verifySession() {
  const URL = `${BASE_URL}/me`;
  return axiosClient.post(URL);
}

export async function signout() {
  const URL = `${BASE_URL}/signout`;
  return axiosClient.post(URL);
}
