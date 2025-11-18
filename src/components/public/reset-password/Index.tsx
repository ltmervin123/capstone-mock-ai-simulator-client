import { useState } from 'react';
import InvalidPage from './InvalidPage';
import ResetPasswordForm from './ResetPasswordForm';

export default function Index() {
  const [isInvalid, setIsInvalid] = useState(false);
  return isInvalid ? <InvalidPage /> : <ResetPasswordForm />;
}
