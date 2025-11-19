import { Link } from 'react-router-dom';

export default function InvalidPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-12 font-inter sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg
              className="h-16 w-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Invalid Link</h2>
          <p className="text-sm text-gray-500">
            This password reset link has expired or is invalid. Please request a new one.
          </p>
        </div>
        <div>
          <Link
            to="/forgot-password"
            className="inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
          >
            Request New Link
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            className="text-sm font-medium text-green-600 hover:text-green-500 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
