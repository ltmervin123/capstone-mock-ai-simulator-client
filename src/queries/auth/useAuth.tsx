import { useMutation } from '@tanstack/react-query';
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
