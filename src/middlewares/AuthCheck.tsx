import Spinner from '@/components/ui/spinner';
import useAuthCheck from '@/hooks/auth/useAuthCheck';
import Modal from '@/layouts/Modal';
import { Navigate, Outlet } from 'react-router-dom';
export default function AuthCheck() {
  const { isLoading, responseError } = useAuthCheck();

  if (isLoading) {
    return (
      <Modal>
        <Spinner type="fullscreen" width="w-32" height="h-32" />
      </Modal>
    );
  }

  if (responseError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
