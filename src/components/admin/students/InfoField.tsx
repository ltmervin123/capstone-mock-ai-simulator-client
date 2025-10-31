import React from 'react';

type InfoFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export default function InfoField({ icon, label, value }: InfoFieldProps) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all md:p-2`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-gray-600">{icon}</span>
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      </div>
      <div className={`font-medium text-gray-900`}>{value}</div>
    </div>
  );
}
