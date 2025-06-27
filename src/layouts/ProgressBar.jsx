import React from 'react';
import { Progress } from '@/components/ui/progress';

export default function ProgressBar({ label, value }) {
  return (
    <div className="md:gap-3lg:gap-4 grid grid-cols-12 items-center gap-1 text-xs sm:gap-2 sm:text-sm   ">
      <span className="col-span-3 truncate sm:col-span-2">{label}</span>
      <Progress
        className="col-span-7 h-3 sm:col-span-8 sm:h-4 md:col-span-9 md:h-5"
        value={value}
      />
      <span className="col-span-2 text-right sm:col-span-2 md:col-span-1">{`${value}%`}</span>
    </div>
  );
}
