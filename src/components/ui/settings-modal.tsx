import { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { Button } from './button';
import InputField from './input-field';
import PasswordField from './password-field';
import Spinner from './spinner';
import { z } from 'zod';

const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine(
      (email) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return domain === 'normi.edu.ph';
      },
      { message: 'Email must be a @normi.edu.ph address' }
    ),
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ChangeEmailForm = z.infer<typeof changeEmailSchema>;
type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

type SettingsModalProps = {
  onClose: () => void;
  currentEmail: string;
};

export default function SettingsModal({ onClose, currentEmail }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email');
  const [isLoading, setIsLoading] = useState(false);

  // Email form state
  const [emailForm, setEmailForm] = useState<ChangeEmailForm>({
    newEmail: '',
    currentPassword: '',
  });
  const [emailErrors, setEmailErrors] = useState<Partial<Record<keyof ChangeEmailForm, string>>>(
    {}
  );

  // Password form state
  const [passwordForm, setPasswordForm] = useState<ChangePasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<
    Partial<Record<keyof ChangePasswordForm, string>>
  >({});

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({ ...prev, [name]: value }));
    if (emailErrors[name as keyof ChangeEmailForm]) {
      setEmailErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name as keyof ChangePasswordForm]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErrors({});

    try {
      changeEmailSchema.parse(emailForm);
      setIsLoading(true);

      // TODO: Implement API call to change email
      // Example:
      // await updateEmail({ newEmail: emailForm.newEmail, currentPassword: emailForm.currentPassword });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success - close modal and show success message
      console.log('Email changed successfully');
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof ChangeEmailForm, string>> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ChangeEmailForm] = err.message;
          }
        });
        setEmailErrors(errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});

    try {
      changePasswordSchema.parse(passwordForm);
      setIsLoading(true);

      // TODO: Implement API call to change password
      // Example:
      // await updatePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success - close modal and show success message
      console.log('Password changed successfully');
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof ChangePasswordForm, string>> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ChangePasswordForm] = err.message;
          }
        });
        setPasswordErrors(errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-inter text-2xl font-bold text-gray-800">Account Settings</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          disabled={isLoading}
        >
          <X size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('email')}
          className={`flex-1 border-b-2 px-4 py-2 font-inter text-sm font-medium transition-colors ${
            activeTab === 'email'
              ? 'border-green-700 text-green-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          disabled={isLoading}
        >
          Change Email
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`flex-1 border-b-2 px-4 py-2 font-inter text-sm font-medium transition-colors ${
            activeTab === 'password'
              ? 'border-green-700 text-green-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          disabled={isLoading}
        >
          Change Password
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="rounded-md bg-green-50 p-3">
              <p className="font-inter text-sm text-gray-600">
                Current Email: <span className="font-medium text-green-700">{currentEmail}</span>
              </p>
            </div>

            <InputField
              label="New Email Address"
              name="newEmail"
              type="email"
              placeholder="Enter new email"
              value={emailForm.newEmail}
              onChange={handleEmailChange}
              error={emailErrors.newEmail}
              disabled={isLoading}
              icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
            />

            <div>
              <label
                htmlFor="currentPassword"
                className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${emailErrors.currentPassword ? 'text-red-500' : ''}`}
              >
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 z-10 text-gray-400" size={18} />
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className={`w-full rounded-md border border-green-700 py-2 pl-10 pr-4 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 ${emailErrors.currentPassword ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
                  value={emailForm.currentPassword}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                />
              </div>
              {emailErrors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">{emailErrors.currentPassword}</p>
              )}
            </div>

            <div className="rounded-md bg-blue-50 p-3">
              <p className="font-inter text-xs text-gray-600">
                Email must be a valid @normi.edu.ph email
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 py-2 font-inter text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Update Email'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="currentPasswordPwd"
                className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${passwordErrors.currentPassword ? 'text-red-500' : ''}`}
              >
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 z-10 text-gray-400" size={18} />
                <input
                  id="currentPasswordPwd"
                  name="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className={`w-full rounded-md border border-green-700 py-2 pl-10 pr-4 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 ${passwordErrors.currentPassword ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
              </div>
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">{passwordErrors.currentPassword}</p>
              )}
            </div>

            <PasswordField
              value={passwordForm.newPassword}
              onChange={(e) =>
                handlePasswordChange({ ...e, target: { ...e.target, name: 'newPassword' } })
              }
              error={passwordErrors.newPassword}
              disabled={isLoading}
              placeholder="Enter new password"
              icon={<Lock className="absolute left-3 top-3 z-10 text-gray-400" size={18} />}
            />

            <div>
              <label
                htmlFor="confirmPassword"
                className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${passwordErrors.confirmPassword ? 'text-red-500' : ''}`}
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 z-10 text-gray-400" size={18} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className={`w-full rounded-md border border-green-700 py-2 pl-10 pr-4 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 ${passwordErrors.confirmPassword ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
              </div>
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{passwordErrors.confirmPassword}</p>
              )}
            </div>

            <div className="rounded-md bg-blue-50 p-3">
              <p className="font-inter text-xs text-gray-600">
                Password must be at least 8 characters long and contain uppercase, lowercase,
                number, and special character.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 py-2 font-inter text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Update Password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
