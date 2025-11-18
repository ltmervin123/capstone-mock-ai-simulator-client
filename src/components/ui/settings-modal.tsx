import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from './button';
import InputField from './input-field';
import { z } from 'zod';
import { useUpdateAdminEmail } from '@/queries/auth/useAuth';
import { AxiosError } from 'axios';
import useSignout from '@/hooks/auth/useSignout';

const changeEmailSchema = z
  .object({
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
    confirmationEmail: z.string().min(1, { message: 'Confirmation email is required' }),
  })
  .refine((data) => data.confirmationEmail === data.newEmail, {
    message: 'Confirmation email must match with the new email',
    path: ['confirmationEmail'],
  });

type ChangeEmailForm = z.infer<typeof changeEmailSchema>;

type SettingsModalProps = {
  onClose: () => void;
  currentEmail: string;
};
          <div className="rounded-md bg-green-50 p-3">
            <p className="font-inter text-xs text-green-600">
              Email successfully updated. You will be signed out and re-login using the new email.
            </p>
          </div>
export default function SettingsModal({ onClose, currentEmail }: SettingsModalProps) {
  const { isLoading: isSignout, handleSignout } = useSignout();
  const [responseError, setResponseError] = useState<string | null>(null);
  const [emailForm, setEmailForm] = useState<ChangeEmailForm>({
    newEmail: '',
    confirmationEmail: '',
  });
  const [emailErrors, setEmailErrors] = useState<Partial<Record<keyof ChangeEmailForm, string>>>(
    {}
  );
  const { mutate: updateAdminEmail, isPending: isLoading } = useUpdateAdminEmail({
    onSuccess: () => {
      handleSignout();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setResponseError(error?.response?.data?.message || 'Failed to update email');
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({ ...prev, [name]: value }));
    setResponseError(null);
    if (emailErrors[name as keyof ChangeEmailForm]) {
      setEmailErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErrors({});

    if (isSignout || isLoading) {
      return;
    }

    const errors = changeEmailSchema.safeParse(emailForm);

    if (!errors.success) {
      const fieldErrors: Partial<Record<keyof ChangeEmailForm, string>> = {};
      errors.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ChangeEmailForm;
        fieldErrors[field] = issue.message;
      });
      setEmailErrors(fieldErrors);
      return;
    }

    updateAdminEmail(emailForm);
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
          className={`flex-1 border-b-2 border-green-700 px-4 py-2 font-inter text-sm font-medium text-green-700 transition-colors`}
        >
          Change Email
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
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
            <div className="relative">
              <InputField
                label="Confirmation Email"
                name="confirmationEmail"
                type="email"
                placeholder="Enter confirmation email"
                value={emailForm.confirmationEmail}
                onChange={handleEmailChange}
                error={emailErrors.confirmationEmail}
                disabled={isLoading}
                icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
              />
            </div>
          </div>

          <div className="rounded-md bg-blue-50 p-3">
            <p className="font-inter text-xs text-gray-600">
              Email must be a valid @normi.edu.ph email
            </p>
          </div>
          {isSignout && (
            <div className="rounded-md bg-green-50 p-3">
              <p className="font-inter text-xs text-green-600">
                Email successfully updated. You will be signed out and re-login using the new email.
              </p>
            </div>
          )}
          {responseError && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="font-inter text-xs text-red-600">{responseError}</p>
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-green-700 py-2 font-inter text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading || isSignout}
          >
            {isLoading ? 'Updating...' : 'Update Email'}
          </Button>
        </form>
      </div>
    </div>
  );
}
