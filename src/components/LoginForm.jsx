import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-50">
      <div className="mx-auto mt-20 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Profile Icon */}
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
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-black-600 text-2x1 block font-inter">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                <svg
                  width="30"
                  height="25"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M29.9 7.368L17.274 17.824C16.9152 18.1213 16.4639 18.2839 15.998 18.2839C15.5321 18.2839 15.0808 18.1213 14.722 17.824L2.102 7.368C2.03429 7.57182 1.99984 7.78522 2 8V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H28C28.5304 26 29.0391 25.7893 29.4142 25.4142C29.7893 25.0391 30 24.5304 30 24V8C30.0008 7.78533 29.967 7.57193 29.9 7.368ZM4 4H28C29.0609 4 30.0783 4.42143 30.8284 5.17157C31.5786 5.92172 32 6.93913 32 8V24C32 25.0609 31.5786 26.0783 30.8284 26.8284C30.0783 27.5786 29.0609 28 28 28H4C2.93913 28 1.92172 27.5786 1.17157 26.8284C0.421427 26.0783 0 25.0609 0 24V8C0 6.93913 0.421427 5.92172 1.17157 5.17157C1.92172 4.42143 2.93913 4 4 4ZM3.58 6L14.732 15.206C15.0892 15.501 15.5377 15.6629 16.0009 15.664C16.4642 15.6651 16.9134 15.5053 17.272 15.212L28.536 6H3.58Z"
                    fill="#0A7E32"
                  />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your @normi.edu.ph email"
                className="w-full rounded-md border border-green-700 py-2 pl-10 pr-4 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-black-600 text-2x1 block font-inter">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-1 flex items-center text-gray-500">
                <svg
                  width="30"
                  height="25"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 26.9168C18.1601 26.9168 17.3547 26.5832 16.7608 25.9893C16.167 25.3955 15.8333 24.59 15.8333 23.7502C15.8333 21.9927 17.2425 20.5835 19 20.5835C19.8399 20.5835 20.6453 20.9171 21.2392 21.511C21.833 22.1049 22.1667 22.9103 22.1667 23.7502C22.1667 24.59 21.833 25.3955 21.2392 25.9893C20.6453 26.5832 19.8399 26.9168 19 26.9168ZM28.5 31.6668V15.8335H9.5V31.6668H28.5ZM28.5 12.6668C29.3399 12.6668 30.1453 13.0005 30.7392 13.5943C31.333 14.1882 31.6667 14.9936 31.6667 15.8335V31.6668C31.6667 32.5067 31.333 33.3121 30.7392 33.906C30.1453 34.4999 29.3399 34.8335 28.5 34.8335H9.5C8.66015 34.8335 7.85469 34.4999 7.26083 33.906C6.66696 33.3121 6.33333 32.5067 6.33333 31.6668V15.8335C6.33333 14.076 7.7425 12.6668 9.5 12.6668H11.0833V9.50016C11.0833 7.40053 11.9174 5.3869 13.4021 3.90223C14.8867 2.41757 16.9004 1.5835 19 1.5835C20.0396 1.5835 21.0691 1.78827 22.0296 2.18612C22.9901 2.58397 23.8628 3.1671 24.5979 3.90223C25.3331 4.63736 25.9162 5.51009 26.314 6.47059C26.7119 7.43108 26.9167 8.46053 26.9167 9.50016V12.6668H28.5ZM19 4.75016C17.7402 4.75016 16.532 5.25061 15.6412 6.14141C14.7504 7.0322 14.25 8.24038 14.25 9.50016V12.6668H23.75V9.50016C23.75 8.24038 23.2496 7.0322 22.3588 6.14141C21.468 5.25061 20.2598 4.75016 19 4.75016Z"
                    fill="#0A7E32"
                  />
                </svg>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-md border border-green-700 py-2 pl-10 pr-4 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              />
            </div>
            <div className="text-left">
              <Link
                to="/forgot-password"
                className="font-inter text-sm font-light text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center rounded-md bg-green-700 font-inter text-2xl font-normal text-white transition-colors duration-300 hover:bg-green-800"
          >
            Log in
          </button>

          {/* Sign Up Link */}
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
