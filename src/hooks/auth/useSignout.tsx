import { signout } from '@/services/auth/auth-service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from '@/stores/public/auth-store';
export default function useSignout() {
  const clearUser = authStore((state) => state.clearUser);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      setIsLoading(true);
      await signout();
      clearUser();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during sign-out:', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleSignout };
}
