import InterviewHeader from '../interview/InterviewHeader';
import InterviewCard from '../interview/InterviewCard';
import InterviewerDropDown from '../ui/drop-down';
import { useState } from 'react';

export type InterviewType = 'Basic' | 'Behavioral' | 'Expert' | 'Custom';

const INTERVIEW_CARDS: Array<{
  type: InterviewType;
  title: string;
  description: string;
}> = [
  {
    type: 'Basic',
    title: 'Beginner Friendly',
    description:
      'Practice answering simple, introductory question where follow-up question are tailored to your self introduction and responses.',
  },
  {
    type: 'Behavioral',
    title: 'Situation Based',
    description:
      'Practice answering behavioral questions focus on past experience and problem solving.',
  },
  {
    type: 'Expert',
    title: 'Role Specific',
    description:
      'Advanced practice with job-specific questions personalized to your resume and career goals.',
  },
];

export default function Interview() {
  const OPTIONS = ['Stella', 'Steve'];

  const [selectedOption, setSelectedOption] = useState('Stella');
  return (
    <div className="mx-auto max-w-7xl rounded bg-white p-4 font-inter">
      <InterviewHeader />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {INTERVIEW_CARDS.map((card) => (
          <InterviewCard
            key={card.type}
            type={card.type}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      <div className="flex justify-start pt-6">
        <InterviewerDropDown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={OPTIONS}
        />
      </div>

      {/* Bottom Section with Webcam Check and Next Button */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-sm text-gray-700">
            Please ensure your webcam and microphone are working
          </span>
        </div>

        <button
          className={`rounded bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
