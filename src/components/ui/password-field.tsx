import PasswordToggle from '@/layouts/PasswordToggle';
import { useState } from 'react';

type PasswordFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
};

export default function PasswordField({ error, value, onChange, disabled }: PasswordFieldProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      {' '}
      <label
        htmlFor="password"
        className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${error ? 'text-red-500' : ''}`}
      >
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          name="password"
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          className={`w-full rounded-md border border-green-700 px-4 py-2 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 ${error ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <span
          onClick={() => setIsShowPassword(!isShowPassword)}
          className="absolute right-3 top-3 cursor-pointer text-gray-600"
        >
          <PasswordToggle isShowPassword={isShowPassword} />
        </span>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
}
