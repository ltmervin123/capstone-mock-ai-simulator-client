import Spinner from '@/components/ui/spinner';
import useAuthCheck from '@/hooks/auth/useAuthCheck';
import Modal from '@/layouts/Modal';
import { Navigate, Outlet } from 'react-router-dom';
import authStore from '@/stores/public/auth-store';
import { roles } from '@/constants/roles';
export default function PersistUser() {
  const user = authStore((state) => state.user);
  const { isLoading } = useAuthCheck();

  if (isLoading) {
    return (
      <Modal>
        <Spinner type="fullscreen" width="w-32" height="h-32" />
      </Modal>
    );
  }

  if (user) {
    if (user.role === roles.STUDENT) {
      return <Navigate to="/user/dashboard" replace />;
    }

    if (user.role === roles.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <Outlet />;
}
