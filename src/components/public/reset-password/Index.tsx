import InvalidPage from './InvalidPage';
import ResetPasswordForm from './ResetPasswordForm';
import { useSearchParams } from 'react-router-dom';
import { useVerifyResetPasswordToken } from '@/queries/auth/useAuth';
import Spinner from '@/components/ui/spinner';

export default function Index() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { data, isPending, isError } = useVerifyResetPasswordToken(token || '');

  if (isPending) {
    return <Spinner type="fullscreen" width="w-32" height="h-32" />;
  }

  if (isError) {
    return <InvalidPage />;
  }

  return <ResetPasswordForm data={data!} token={token || ''} />;
}
