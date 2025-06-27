import React from 'react';
import ProgressBar from '../layouts/ProgressBar';
import InterviewTypeScoreBar from '../layouts/InterviewTypeScoreBar';

export default function DashboardStat() {
  const PerformanceBreakdownData = [
    {
      label: 'Grammar',
      value: 76,
    },
    {
      label: 'Skills',
      value: 85,
    },
    {
      label: 'Experience',
      value: 90,
    },
    {
      label: 'Relevance',
      value: 90,
    },
  ];

  const InterviewTypeScores = [
    {
      type: 'Basic Interview',
      score: 100,
    },
    {
      type: 'Behavioral Interview',
      score: 90,
    },
    {
      type: 'Expert Interview',
      score: 80,
    },
  ];
  return (
    <>
      {/* Performance Breakdown */}
      <div className="grid h-auto w-full rounded bg-white p-4 font-inter shadow-sm">
        <h1 className="mb-2 text-lg font-bold text-green-700">Performance Breakdown</h1>
        <div className="grid auto-rows-auto gap-y-2 sm:gap-y-3">
          {PerformanceBreakdownData.map((item, index) => (
            <ProgressBar key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>

      {/* Interview Scores */}
      <div className="grid-cols-1rounded grid h-auto gap-3 bg-white p-4">
        <h1 className="mb-2 text-lg font-bold text-green-700">Interview Type Scores</h1>

        {InterviewTypeScores.map((item, index) => (
          <InterviewTypeScoreBar key={index} type={item.type} score={item.score} />
        ))}
      </div>
    </>
  );
}
