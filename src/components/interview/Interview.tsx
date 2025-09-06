import React from 'react';
import InterviewHeader from '../interview/InterviewHeader';
import InterviewCard from '../interview/InterviewCard';

export default function Interview() {
  return (
    <div className="h-full w-full rounded bg-white p-4 font-inter">
      <InterviewHeader />
      <div className="grid grid-cols-1 grid-rows-1 gap-6">
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
      </div>
    </div>
  );
}
