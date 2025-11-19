import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useState } from 'react';
import InputField from '@/components/ui/input-field';
import { Mail } from 'lucide-react';
import { useSendResetPasswordEmail } from '@/queries/auth/useAuth';
import Modal from '@/layouts/Modal';

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .refine(
      (email) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return domain === 'normi.edu.ph';
      },
      { message: 'Email must be a @normi.edu.ph address' }
    ),
});

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: sendResetPasswordEmail, isPending } = useSendResetPasswordEmail({
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error: any) => {
      if (error.response && error.response.data && error.response.data.message) {
        setResponseError(error.response.data.message);
      } else {
        setResponseError('An unexpected error occurred. Please try again later.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setResponseError(null);

    const result = ForgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    sendResetPasswordEmail(email);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-12 font-inter sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-900">
            Forgot your password?
          </h2>
          <p className="text-center text-sm text-gray-500">
            Enter your @normi.edu.ph email so we can send you a link to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-1">
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your @normi.edu.ph email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationError(null);
                  setResponseError(null);dad
                }}
                error={validationError || undefined}
                disabled={isPending}
                icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
              />
              {responseError && (
                <p className="mt-3 animate-[scaleIn_0.3s_ease-in-out] rounded-md border border-red-500 bg-red-100 px-2 py-2 text-sm text-red-500">
                  {responseError}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-green-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              {isPending ? 'Sending...' : 'Send Reset Password Link'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-green-600 hover:text-green-500 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
      {/* Display a success message when email is sent */}
      {isSuccess && (
        <Modal>
          <div className="w-full max-w-sm animate-[slideUp_0.3s_ease-out] rounded-lg bg-white p-8 shadow-xl">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Email Sent Successfully</h2>
              <p className="text-sm text-gray-600">
                If an account with the provided email exists, a password reset link has been sent to
                your inbox. Please check your email and follow the instructions.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full rounded-md bg-green-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Back to Login
              </button>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Try Another Email
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
