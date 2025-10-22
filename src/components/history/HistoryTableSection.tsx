import { InterviewType } from '@/types/shared/interview-type';
import HistoryCard from './HistoryCard';
import { useState } from 'react';
import InterviewDetail from './InterviewDetailModal';
import authStore from '@/stores/auth-store';
import { useGetInterviewHistory } from '@/queries/useInterview';

export default function HistoryTableSection() {
  const user = authStore((state) => state.user);
  const { data: interviewHistory = [], isPending, isError, error } = useGetInterviewHistory(user!);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [isViewingDetail, setIsViewingDetail] = useState(false);

  const handleViewDetail = (historyId: string) => {
    setSelectedHistoryId(historyId);
    setIsViewingDetail(true);
  };

  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4">
      <h1 className="semi-bold text-xl text-gray-500">Interview Session</h1>
      <div className="flex max-h-[55vh] flex-col gap-3 overflow-y-auto">
        {isError && (
          <div className="flex h-[100vh] items-center justify-center text-red-400">
            {error instanceof Error ? error.message : 'An error occurred while fetching data.'}
          </div>
        )}
        {isPending && (
          <div className="flex h-[100vh] items-center justify-center text-gray-400">Loading...</div>
        )}
        {interviewHistory.length === 0 && !isPending && !isError && (
          <div className="flex h-[100vh] items-center justify-center text-gray-400">
            No interview history available.
          </div>
        )}
        {interviewHistory.map((history, index) => (
          <HistoryCard
            key={index}
            type={history.interviewType as InterviewType}
            date={history.createdAt}
            duration={history.duration}
            questions={history.numberOfQuestions}
            score={history.totalScore}
            setIsViewingDetail={() => handleViewDetail(history._id)}
          />
        ))}
      </div>

      <InterviewDetail
        historyId={selectedHistoryId}
        isOpen={isViewingDetail}
        onClose={() => setIsViewingDetail(false)}
      />
    </div>
  );
}
