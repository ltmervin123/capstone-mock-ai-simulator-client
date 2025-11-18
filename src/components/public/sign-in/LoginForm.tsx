import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../ui/input-field';
import { EmailIcon, PasswordIcon } from '../../ui/icon';
import PasswordField from '../../ui/password-field';
import Spinner from '../../ui/spinner';
import Modal from '@/layouts/Modal';
import useSignin from '@/hooks/auth/useSignin';
import { roles } from '@/constants/roles';

export default function LoginForm() {
  const navigate = useNavigate();
  const { validationErrors, isLoading, signIn, setValidationErrors, responseError } = useSignin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValidationErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn(formData);

    if (!result.success && result.error === 'ValidationError') {
      return;
    }

    if (!result.success && result.error === 'RequestError') {
      return;
    }

    if (result.user?.role === roles.ADMIN) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }

    if (result.user?.role === roles.STUDENT) {
      navigate('/user/dashboard', { replace: true });
      return;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-50">
      {isLoading && (
        <Modal>
          <Spinner type="fullscreen" width="w-32" height="h-32" />
        </Modal>
      )}

      <div className="mx-auto mt-20 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex justify-center">
          <svg
            width="150"
            height="150"
            viewBox="0 0 214 214"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.6667 160.5C35.6667 151.04 39.4244 141.968 46.1132 135.28C52.802 128.591 61.8739 124.833 71.3333 124.833H142.667C152.126 124.833 161.198 128.591 167.887 135.28C174.576 141.968 178.333 151.04 178.333 160.5C178.333 165.229 176.454 169.765 173.11 173.11C169.766 176.454 165.23 178.333 160.5 178.333H53.5C48.7703 178.333 44.2343 176.454 40.8899 173.11C37.5455 169.765 35.6667 165.229 35.6667 160.5Z"
              stroke="#0A7E32"
              stroke-linejoin="round"
            />
            <path
              d="M107 89.1665C121.774 89.1665 133.75 77.1901 133.75 62.4165C133.75 47.6429 121.774 35.6665 107 35.6665C92.2264 35.6665 80.25 47.6429 80.25 62.4165C80.25 77.1901 92.2264 89.1665 107 89.1665Z"
              stroke="#0A7E32"
            />
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            className="space-y-2"
            label={'Email'}
            name={'email'}
            type={'email'}
            placeholder={'Enter your @normi.edu.ph email'}
            value={formData.email}
            onChange={handleChange}
            icon={EmailIcon}
            error={validationErrors?.email}
          />

          <div className="space-y-2">
            <PasswordField
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={PasswordIcon}
              className="space-y-2"
              error={validationErrors?.password}
            />
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {responseError && (
            <p className="animate-[scaleIn_0.3s_ease-in-out] rounded-md border border-red-500 bg-red-100 px-2 py-2 text-sm text-red-500">
              {responseError.message}
            </p>
          )}

          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center rounded-md bg-green-700 font-inter text-2xl font-normal text-white transition-colors duration-300 hover:bg-green-800"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="text-black-600 text-center font-inter text-sm">
            Need account?{' '}
            <Link to="/signup" className="font-medium text-green-700 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
