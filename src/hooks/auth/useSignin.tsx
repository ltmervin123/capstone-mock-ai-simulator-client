import { useState } from 'react';
import { SigninPayload as SigninPayloadType } from '@/zod-schemas/sign-in-zod-schema';
import { AxiosError } from 'axios';
import { ResponseErrorType } from '@/types/shared/response-type';
import authStore from '@/stores/auth-store';
import { User } from '@/types/auth/auth-type';
import { validateSignInData, ValidationErrors } from '@/utils/validators/sign-in-validator';
import { signin } from '@/services/auth/auth-service';

export default function useSignin() {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [responseError, setResponseError] = useState<ResponseErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = authStore((state) => state.setUser);

  const signIn = async (data: SigninPayloadType) => {
    setValidationErrors({});
    setResponseError(null);
    const validationErrors = validateSignInData(data);
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return { success: false, error: 'ValidationError' };
    }
    try {
      setIsLoading(true);
      const response = await signin(data);

      setUser(response?.data?.user as User);

      return { success: true, user: response?.data?.user as User };
    } catch (error) {
      console.error('Error during sign-in:', (error as Error).message);
      setResponseError((error as AxiosError).response?.data as ResponseErrorType);
      return { success: false, error: 'RequestError' };
    } finally {
      setIsLoading(false);
    }
  };

  return { validationErrors, isLoading, signIn, setValidationErrors, responseError };
}
