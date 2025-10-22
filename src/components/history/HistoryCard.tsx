import { InterviewType } from '@/types/shared/interview-type';
import { handleDateFormat } from '@/utils/handleDates';

const CLASS_COLOR = {
  Basic: {
    bg: 'bg-green-600',
    gradient: 'from-green-500 to-green-600',
    glow: 'shadow-green-500/50',
    text: 'text-green-600',
    lightBg: 'bg-green-50',
    border: 'border-green-200',
    ring: 'ring-green-500',
  },
  Behavioral: {
    bg: 'bg-yellow-400',
    gradient: 'from-yellow-400 to-yellow-500',
    glow: 'shadow-yellow-400/50',
    text: 'text-yellow-600',
    lightBg: 'bg-yellow-50',
    border: 'border-yellow-200',
    ring: 'ring-yellow-400',
  },
  Expert: {
    bg: 'bg-red-400',
    gradient: 'from-red-400 to-red-500',
    glow: 'shadow-red-400/50',
    text: 'text-red-600',
    lightBg: 'bg-red-50',
    border: 'border-red-200',
    ring: 'ring-red-400',
  },
};

const interviewTypeIcons = {
  Basic: '📋',
  Behavioral: '🎭',
  Expert: '🎓',
};

interface HistoryCardProps {
  type: InterviewType;
  date: Date;
  duration: string;
  questions: number;
  score: number;
  isViewed: boolean;
  setIsViewingDetail: () => void;
}

function HistoryCard({
  type,
  date,
  duration,
  questions,
  score,
  isViewed,
  setIsViewingDetail,
}: HistoryCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Practice';
  };

  return (
    <div className="rounded-2xl border-2 bg-white transition-all duration-300 ease-out">
      <div className="flex flex-col gap-4 p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-start gap-3 sm:gap-4">
          {/* Animated vertical accent bar */}
          <div className="relative flex-shrink-0">
            <div
              className={`h-20 w-1.5 rounded-full sm:h-28 ${CLASS_COLOR[type].bg} transition-all duration-300 group-hover:w-2`}
            ></div>
          </div>

          <div className="min-w-0 flex-1">
            {/* Header with badge and new indicator */}
            <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r px-2.5 py-1 text-xs font-semibold text-white sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm ${CLASS_COLOR[type].gradient} transition-all duration-300 group-hover:scale-105`}
              >
                <span className="text-base sm:text-lg">{interviewTypeIcons[type]}</span>
                <span className="whitespace-nowrap">{type} Interview</span>
              </span>

              {!isViewed && (
                <span className="inline-flex animate-bounce items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 sm:px-2.5 sm:py-1">
                  NEW
                </span>
              )}
            </div>

            {/* Metadata with icons */}
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 sm:mb-3 sm:gap-x-4 sm:text-sm">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-sm sm:text-base">📅</span>
                <span className="whitespace-nowrap">{handleDateFormat(date)}</span>
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-sm sm:text-base">⏱️</span>
                <span className="whitespace-nowrap">{duration}</span>
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-sm sm:text-base">❓</span>
                <span className="whitespace-nowrap">{questions} questions</span>
              </span>
            </div>

            {/* Score section with progress bar */}
            <div
              className={`inline-flex w-full flex-wrap items-center gap-2 rounded-lg px-2.5 py-1.5 sm:w-auto sm:gap-3 sm:px-3 sm:py-2 ${!isViewed ? CLASS_COLOR[type].lightBg : 'bg-gray-50'} transition-all duration-300`}
            >
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Score:
                </span>
                <span className={`text-xl font-bold sm:text-2xl ${getScoreColor(score)}`}>
                  {score}
                </span>
                <span className="text-xs font-medium text-gray-400 sm:text-sm">/100</span>
              </div>

              {/* Mini progress bar */}
              <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200 sm:w-24">
                <div
                  className={`h-full bg-gradient-to-r ${CLASS_COLOR[type].gradient} transition-all duration-1000 ease-out`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <span className={`text-xs font-semibold ${CLASS_COLOR[type].text}`}>
                {getScoreLabel(score)}
              </span>
            </div>
          </div>
        </div>

        {/* Call-to-action button */}
        <button
          onClick={() => setIsViewingDetail()}
          className={`group/btn relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 sm:px-5 sm:py-3 lg:w-auto ${CLASS_COLOR[type].gradient}`}
        >
          <span>View Results</span>
          <span className="text-base transition-transform duration-300 group-hover/btn:translate-x-1 sm:text-lg">
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;
