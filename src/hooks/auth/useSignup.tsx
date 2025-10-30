import { useState } from 'react';
import { validateSignUpData, ValidationErrors } from '../../utils/validators/sign-up-validator';
import { SignupFormData } from '../../zod-schemas/sign-up-zod-schema';
import { AxiosError } from 'axios';
import { ResponseErrorType } from '@/types/shared/response-type';
import { signup } from '@/services/auth/auth-service';
export default function useSignup() {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [responseError, setResponseError] = useState<ResponseErrorType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUp = async (data: SignupFormData) => {
    setValidationErrors({});
    setResponseError(null);
    const validationErrors = validateSignUpData(data);
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return { success: false, error: 'ValidationError' };
    }
    try {
      setIsSubmitting(true);

      await signup(data);
      return { success: true };
    } catch (error) {
      console.error('Error during sign-up:', (error as Error).message);
      setResponseError((error as AxiosError).response?.data as ResponseErrorType);
      return { success: false, error: 'RequestError' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { validationErrors, isSubmitting, signUp, setValidationErrors, responseError };
}
