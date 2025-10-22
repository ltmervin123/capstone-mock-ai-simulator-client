import { useState } from 'react';
import { signout } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

export default function useSignout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      setIsLoading(true);
      await signout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during sign-out:', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleSignout };
}
