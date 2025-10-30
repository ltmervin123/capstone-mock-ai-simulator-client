import InterviewFeedback from './InterviewFeedback';
import InterviewScores from './InterviewScores';
import InterviewSummary from './InterviewSummary';
import { useEffect, useRef, useState } from 'react';
import Controller from './Controller';
import { useGetInterviewDetail } from '@/queries/student/useInterviewHistory';
import { updateUnViewedInterviewCount } from '@/queries/student/useNotification';
import Spinner from '../../ui/spinner';
import InterviewDetailHeader from './InterviewDetailHeader';
import { useQueryClient } from '@tanstack/react-query';

type InterviewDetailProps = {
  historyId: string;
  isViewed: boolean;
  onClose: () => void;
};

export default function InterviewDetail({ onClose, historyId, isViewed }: InterviewDetailProps) {
  const { data: interviewDetail, isFetching, isError, error } = useGetInterviewDetail(historyId!);
  const { mutate: updateUnViewedCount } = updateUnViewedInterviewCount({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['un-viewed-interview-count'] });
      queryClient.invalidateQueries({ queryKey: ['interview-history'] });
    },
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const queryClient = useQueryClient();
  const isUpdated = useRef(false);

  useEffect(() => {
    if (!isViewed && !isUpdated.current) {
      isUpdated.current = true;
      updateUnViewedCount(
        { interviewId: historyId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['un-viewed-interview-count'] });
            queryClient.invalidateQueries({ queryKey: ['interview-history'] });
          },
        }
      );
    }
  }, [historyId]);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative mx-4 w-full max-w-5xl rounded-2xl p-8">
          <Spinner
            type="fullscreen"
            width="w-16"
            height="h-16"
            message="Loading interview details..."
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Error Loading Interview</h3>
          <p className="mb-6 text-sm text-gray-600">{error.message}</p>
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="border-b border-gray-200 px-6 py-5 sm:px-8">
          <InterviewDetailHeader onClose={onClose} onPrint={handlePrint} />
        </div>

        {/* Scrollable content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="space-y-6">
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
              areaOfImprovement={
                interviewDetail?.feedbacks[currentQuestionIndex].areaOfImprovement!
              }
              feedback={interviewDetail?.feedbacks[currentQuestionIndex].answerFeedback!}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 px-6 py-4 sm:px-8">
          <Controller
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            data={interviewDetail?.feedbacks!}
          />
        </div>
      </div>
    </div>
  );
}
