import { InterviewType } from '@/types/shared/interview-type';

const CLASS_COLOR = {
  Basic: {
    bg: 'bg-green-600',
  },
  Behavioral: {
    bg: 'bg-yellow-400',
  },
  Expert: {
    bg: 'bg-red-400',
  },
};

interface HistoryCardProps {
  type: InterviewType;
  date: string;
  duration: string;
  questions: number;
  score: number;
  totalScore: number;
  setIsViewingDetail: (isViewing: boolean) => void;
}

function HistoryCard({
  type,
  date,
  duration,
  questions,
  score,
  totalScore,
  setIsViewingDetail,
}: HistoryCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between pr-4">
        <div className="flex items-center gap-3">
          {/* Green bar on the left */}
          <div className={`h-28 w-5 ${CLASS_COLOR[type].bg} rounded`}></div>

          <div>
            {/* Interview type badge */}
            <span
              className={`inline-block rounded px-3 py-1 text-sm font-medium text-white ${CLASS_COLOR[type].bg} mb-2`}
            >
              {type} Interview
            </span>

            {/* Date and duration */}
            <div className="text-sm text-gray-600">
              {date} • {duration} — {questions}/5 questions
            </div>

            {/* Score */}
            <div className="font-medium text-gray-800">
              Score: {score}/{totalScore}
            </div>
          </div>
        </div>

        {/* View Details button */}
        <button
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          onClick={() => setIsViewingDetail(true)}
        >
          View Details
        </button> 
      </div>
    </div>
  );
}

export default HistoryCard;
