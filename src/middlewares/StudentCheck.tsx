import authStore from '@/stores/public/auth-store';
import { roles } from '@/constants/roles';
import { Navigate, Outlet } from 'react-router-dom';
export default function StudentCheck() {
  const user = authStore((state) => state.user);

  if (user?.role !== roles.STUDENT) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
