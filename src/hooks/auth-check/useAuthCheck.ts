import { verifySession } from '@/services/auth-service';
import authStore from '@/stores/auth-store';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function useAuthCheck() {
  const clearUser = authStore((state) => state.clearUser);
  const user = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);
  const [responseError, setResponseError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (user) {
          return;
        }
        setIsLoading(true);

        const response = await verifySession();
        setUser(response.user);
      } catch (error) {
        clearUser();
        setResponseError(error as AxiosError);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isLoading, responseError };
}
