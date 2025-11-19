import PasswordField from '@/components/ui/password-field';
import Modal from '@/layouts/Modal';
import { useUpdatePassword, VerifyResetPasswordTokenResponse } from '@/queries/auth/useAuth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';

// Reset password validation schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

type ResetPasswordFormProps = {
  data: VerifyResetPasswordTokenResponse;
  token: string;
};

export default function ResetPasswordForm({ data, token }: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: updatePassword, isPending, isSuccess } = useUpdatePassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    updatePassword({
      newPassword: formData.password,
      confirmationPassword: formData.confirmPassword,
      id: data._id,
      token,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-12 font-inter sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-900">
            Reset your password
          </h2>
          <p className="text-center text-sm text-gray-500">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <PasswordField
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter new password"
            className="w-full"
          />

          <div>
            <label
              htmlFor="confirmPassword"
              className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${errors.confirmPassword ? 'text-red-500' : ''}`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={`w-full rounded-md border border-green-700 px-4 py-2 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 ${errors.confirmPassword ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isPending}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
            >
              {isPending ? 'Resetting...' : 'Reset Password'}
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
              <h2 className="text-2xl font-bold text-gray-900">Password Reset Successfully</h2>
              <p className="text-sm text-gray-600">
                Your password has been successfully reset. You can now log in with your new
                password.
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
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
