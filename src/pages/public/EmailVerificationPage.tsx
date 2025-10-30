import { ErrorIcon, SuccessIcon } from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/ui/spinner';
import Header from '@/layouts/Header';
import Modal from '@/layouts/Modal';
import useVerifyStudentEmail from '@/hooks/auth/useVerifyStudentEmail';
import { useEffect } from 'react';

type ResponseData = {
  email: string;
};
export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const { isLoading, verifyEmail, responseError, validationErrors, isSuccess, data } =
    useVerifyStudentEmail();

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div>
      <Header />
      {isLoading && <Spinner type="fullscreen" width="w-32" height="h-32" />}

      {validationErrors && (
        <Modal>
          <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-red-600">
                {ErrorIcon}
              </div>
              <p className="text-center text-gray-800">{validationErrors}</p>
              <button
                onClick={() => navigate('/', { replace: true })}
                className="mt-4 rounded-md bg-green-600 px-8 py-2 font-medium text-white hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
      {responseError && (
        <Modal>
          <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-red-600">
                {ErrorIcon}
              </div>
              <p className="text-center text-gray-800">{responseError.message}</p>
              <button
                onClick={() => navigate('/', { replace: true })}
                className="mt-4 rounded-md bg-green-600 px-8 py-2 font-medium text-white hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isSuccess && (
        <Modal>
          <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-600">
                {SuccessIcon}
              </div>
              <p className="text-center text-gray-800">
                {' '}
                Email{' '}
                <span className="font-bold text-green-700">
                  {(data?.data as ResponseData)?.email}
                </span>{' '}
                has been successfully verified.
              </p>
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="mt-4 rounded-md bg-green-600 px-8 py-2 font-medium text-white hover:bg-green-700"
              >
                Sign in
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
