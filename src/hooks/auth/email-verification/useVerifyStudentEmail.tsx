import { useState } from 'react';
import { AxiosError } from 'axios';
import { ResponseErrorType, ResponseSuccessType } from '@/types/shared/response-type';
import { useSearchParams } from 'react-router-dom';
import { verifyStudentEmail } from '@/services/auth/auth-service';
export default function useVerifyStudentEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [validationErrors, setValidationErrors] = useState<string>('');
  const [responseError, setResponseError] = useState<ResponseErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<ResponseSuccessType | null>(null);

  const verifyEmail = async () => {
    setValidationErrors('');
    setResponseError(null);

    setIsLoading(true);
    if (!token) {
      setValidationErrors('Verification token is missing.');
      return { success: false, error: 'ValidationError' };
    }

    try {
      const response = await verifyStudentEmail(token);
      setData(response.data);
      setIsSuccess(true);
      return { success: true };
    } catch (error) {
      console.error('Error during student email verification: ', (error as Error).message);
      setResponseError((error as AxiosError).response?.data as ResponseErrorType);
      return { success: false, error: 'RequestError' };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, verifyEmail, responseError, validationErrors, isSuccess, data };
}
