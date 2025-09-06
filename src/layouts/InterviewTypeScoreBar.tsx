import React from 'react';

export default function InterviewTypeScoreBar({ type = 'Expert Interview', score = 100 }) {
  const BAR_COLOR = {
    'Basic Interview': 'bg-green-500',
    'Behavioral Interview': 'bg-yellow-500',
    'Expert Interview': 'bg-red-500',
  };

  return (
    <div className="grid grid-cols-12 text-xs sm:text-sm">
      <span className={`col-span-1 h-auto w-4 ${BAR_COLOR[type]}`}></span>
      <div className="col-span-11 flex w-full grid-cols-2 items-center justify-between rounded-md bg-gray-100 px-4 py-2 text-gray-700">
        <span className="truncate font-medium text-gray-800">{type}</span>
        <div className="truncate rounded-full font-bold text-green-700">{score}%</div>
      </div>
    </div>
  );
}
