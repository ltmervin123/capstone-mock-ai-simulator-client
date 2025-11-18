import { useMutation, useQuery } from '@tanstack/react-query';
import * as AuthService from '@/services/auth/auth-service';

type UpdateAdminEmailData = {
  newEmail: string;
  confirmationEmail: string;
};

export const useUpdateAdminEmail = (options = {}) => {
  return useMutation({
    mutationFn: (data: UpdateAdminEmailData) =>
      AuthService.updateAdminEmail(data.newEmail, data.confirmationEmail),
    ...options,
  });
};

export const useSendResetPasswordEmail = (options = {}) => {
  return useMutation({
    mutationFn: (email: string) => AuthService.sendResetPasswordEmail(email),
    ...options,
  });
};

export const useUpdatePassword = (options = {}) => {
  return useMutation({
    mutationFn: (data: {
      newPassword: string;
      confirmationPassword: string;
      id: string;
      token: string;
    }) =>
      AuthService.updatePassword(data.newPassword, data.confirmationPassword, data.id, data.token),
    ...options,
  });
};

export type VerifyResetPasswordTokenResponse = {
  _id: string;
  email: string;
  firstName: string;
};

export const useVerifyResetPasswordToken = (token: string) => {
  return useQuery<VerifyResetPasswordTokenResponse, Error>({
    queryKey: ['verify-reset-password-token', token],
    queryFn: () => AuthService.verifyResetPasswordToken(token),
    enabled: !!token,
    staleTime: Infinity,
    retry: false,
  });
};
