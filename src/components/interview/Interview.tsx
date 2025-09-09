import BottomSection from './BottomSection';
import InterviewHeader from '../interview/InterviewHeader';
import InterviewCard from '../interview/InterviewCard';
import InterviewerDropDown from '../ui/drop-down';
import { useState } from 'react';
import BehavioralCategory from './BehavioralCategory';
import ResumeUpload from './ResumeUpload';
import { InterviewType } from '@/types/shared/interview-type';

const INTERVIEW_CARDS = [
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
  const [showBehavioralModal, setShowBehavioralModal] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);

  const handleOnProceedResumeUpload = (resumeFile: File | null, jobTitle: string) => {
    console.log('Resume File: ', resumeFile);
    console.log('Job Title: ', jobTitle);
    setShowResumeUpload(false);
  };

  const handleCardSelect = (type: string) => {
    if (type === 'Behavioral') {
      setShowBehavioralModal(true);
    } else if (type === 'Expert') {
      setShowResumeUpload(true);
    }
  };

  const handleOnSelectBehavioral = (selectedCategory: string) => {
    console.log('Selected Behavioral Category: ', selectedCategory);
    setShowBehavioralModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl rounded bg-white p-4 font-inter">
      <InterviewHeader />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {INTERVIEW_CARDS.map((card) => (
          <InterviewCard
            key={card.type}
            type={card.type as InterviewType}
            title={card.title}
            description={card.description}
            handleCardSelect={handleCardSelect}
          />
        ))}
      </div>
      <div className="flex w-32 flex-col justify-start gap-2 pt-6">
        <InterviewerDropDown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={OPTIONS}
        />
        <div className="text-xs">Select Interviewer</div>
      </div>

      <BottomSection />

      <BehavioralCategory
        isOpen={showBehavioralModal}
        onClose={() => setShowBehavioralModal(false)}
        onCategorySelect={handleOnSelectBehavioral}
      />

      <ResumeUpload
        isOpen={showResumeUpload}
        onClose={() => setShowResumeUpload(false)}
        onProceed={handleOnProceedResumeUpload}
      />
    </div>
  );
}
