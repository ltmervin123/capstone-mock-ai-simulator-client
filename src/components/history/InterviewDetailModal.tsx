import { X } from 'lucide-react';
import InterviewFeedback from './InterviewFeedback';
import InterviewScores from './InterviewScores';
import InterviewSummary from './InterviewSummary';
import { useState } from 'react';
import Controller from './Controller';
import { useGetInterviewDetail } from '@/queries/useInterview';
import Spinner from '../ui/spinner';

type InterviewDetailProps = {
  historyId?: string | null;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function InterviewDetail({ isOpen, onClose, historyId }: InterviewDetailProps) {
  const { data: interviewDetail, isFetching, isError, error } = useGetInterviewDetail(historyId!);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  if (!isOpen) return null;

  if (isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative mx-4 h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-green-50 p-4">
          <Spinner
            type="fullscreen"
            width="w-32"
            height="h-32"
            message="Loading interview details..."
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative mx-4 h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-green-50 p-4">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-green-50 p-4">
        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="pb-4 text-2xl font-bold text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <InterviewSummary
          type={interviewDetail?.interviewType!}
          date={interviewDetail?.createdAt!}
          duration={interviewDetail?.duration!}
          questions={interviewDetail?.numberOfQuestions!}
        />
        <InterviewScores scores={interviewDetail?.scores!} />
        <InterviewFeedback
          question={interviewDetail?.feedbacks[currentQuestionIndex].question!}
          answer={interviewDetail?.feedbacks[currentQuestionIndex].answer!}
          areaOfImprovement={interviewDetail?.feedbacks[currentQuestionIndex].areaOfImprovement!}
          feedback={interviewDetail?.feedbacks[currentQuestionIndex].answerFeedback!}
        />

        <Controller
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          data={interviewDetail?.feedbacks!}
        />
      </div>
    </div>
  );
}
