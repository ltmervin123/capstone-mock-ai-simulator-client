import PasswordField from '@/components/ui/password-field';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
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

    try {
      resetPasswordSchema.parse(formData);
      setIsLoading(true);
      // TODO: Call reset password API
      // await resetPassword(formData);
      console.log('Form submitted:', formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
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
    </div>
  );
}
