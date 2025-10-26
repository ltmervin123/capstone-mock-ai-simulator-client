import React from 'react';
import { Link } from 'react-router-dom';
import { INPUT_CLASSES } from '../../../constants/sharedClasses';

export default function ForgotPasswordForm() {
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
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your @normi.edu.ph email"
                required
                className={INPUT_CLASSES}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Send Link
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
