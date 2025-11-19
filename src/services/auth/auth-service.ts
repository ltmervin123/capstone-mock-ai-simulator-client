import axiosClient from '../../utils/axios';
import { type SignupFormData as SignupType } from '../../zod-schemas/public/sign-up-zod-schema';
import { type SigninPayload as SigninType } from '../../zod-schemas/public/sign-in-zod-schema';
import { VerifyResetPasswordTokenResponse } from '@/queries/auth/useAuth';
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
  const response = await axiosClient.post(URL);
  return response.data;
}

export async function signout() {
  const URL = `${BASE_URL}/signout`;
  return axiosClient.post(URL);
}

export async function updateAdminEmail(newEmail: string, confirmationEmail: string) {
  const URL = `${BASE_URL}/update-admin-email`;
  await axiosClient.post(URL, { newEmail, confirmationEmail });
}

export async function sendResetPasswordEmail(email: string) {
  const URL = `${BASE_URL}/send-reset-password-link`;
  await axiosClient.post(URL, { email });
}

export async function verifyResetPasswordToken(
  token: string
): Promise<VerifyResetPasswordTokenResponse> {
  const URL = `${BASE_URL}/verify-reset-password-token/${token}`;
  const response = await axiosClient.get(URL);
  return response.data.userData;
}

export async function updatePassword(
  newPassword: string,
  confirmationPassword: string,
  id: string,
  token: string
) {
  const URL = `${BASE_URL}/update-account-password`;
  const response = await axiosClient.put(URL, {
    newPassword,
    confirmationPassword,
    id,
    token,
  });
  return response.data.userData;
}
