import BottomSection from './BottomSection';
import InterviewHeader from './Header';
import InterviewCard from './InterviewCard';
import InterviewerDropDown from '../../ui/drop-down';
import { useState } from 'react';
import BehavioralCategory from './BehavioralCategoryModal';
import ResumeUpload from './ResumeUploadModal';
import { InterviewType } from '@/types/shared/interview-type';
import { useNavigate } from 'react-router-dom';
import interviewStore from '@/stores/interview-store';

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

const INTERVIEWEE_OPTIONS = ['Alice', 'Steve'];

export default function Index() {
  const [selectedOption, setSelectedOption] = useState(INTERVIEWEE_OPTIONS[0]);
  const [showBehavioralModal, setShowBehavioralModal] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const navigate = useNavigate();
  const setInterviewOption = interviewStore((state) => state.setInterviewOption);

  const handleCardSelect = (type: string) => {
    if (type === 'Basic') {
      setInterviewOption({
        interviewType: 'Basic',
        selectedInterviewee: selectedOption as 'Alice' | 'Steve',
      });

      handleStart();
      return;
    }

    if (type === 'Behavioral') {
      setShowBehavioralModal(true);
      return;
    }

    if (type === 'Expert') {
      setShowResumeUpload(true);
      return;
    }
  };

  const handleStart = () => {
    navigate('/interview/answer');
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
          options={INTERVIEWEE_OPTIONS}
        />
        <div className="text-xs">Select Interviewer</div>
      </div>

      <BottomSection />

      <BehavioralCategory
        isOpen={showBehavioralModal}
        onClose={() => setShowBehavioralModal(false)}
        handleStart={handleStart}
        selectedOption={selectedOption}
      />

      <ResumeUpload
        isOpen={showResumeUpload}
        onClose={() => setShowResumeUpload(false)}
        handleStart={handleStart}
        selectedOption={selectedOption}
      />
    </div>
  );
}
