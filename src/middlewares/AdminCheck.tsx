import authStore from '@/stores/auth-store';
import { roles } from '@/constants/roles';
import { Navigate, Outlet } from 'react-router-dom';
export default function AdminCheck() {
  const user = authStore((state) => state.user);

  if (user?.role !== roles.ADMIN) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
