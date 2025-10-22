import React from 'react';

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export default function InputField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  className,
  maxLength,
  disabled,
  icon,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${error ? 'text-red-500' : ''}`}
      >
        {label}
      </label>
      <div className="relative">
        {icon}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-md border border-green-700 px-4 py-2 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 ${error ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300' : ''} ${icon ? 'pl-10' : ''}`}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
