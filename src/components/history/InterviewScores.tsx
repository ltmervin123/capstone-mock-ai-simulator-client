import { TrendingUp, TrendingDown, Minus, MessageCircle } from 'lucide-react';
type InterviewScoresProps = {
  scores: {
    grammar: number;
    skills: number;
    experience: number;
    relevance: number;
    totalScore: number;
    fillerCount: number;
  };
};

export default function InterviewScores({ scores }: InterviewScoresProps) {
  const maxScore = 100;

  const scoreItems = [
    { name: 'Grammar', value: scores.grammar, maxScore },
    { name: 'Skills', value: scores.skills, maxScore },
    { name: 'Experience', value: scores.experience, maxScore },
    { name: 'Relevance', value: scores.relevance, maxScore },
  ];

  const overallScore = scores.totalScore;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (percentage: number) => {
    if (percentage >= 75) return TrendingUp;
    if (percentage >= 50) return Minus;
    return TrendingDown;
  };

  const getFillerCountColor = (count: number) => {
    if (count <= 5) return 'text-green-600 bg-green-100';
    if (count <= 12) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Performance Scores</h2>
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 ${getFillerCountColor(scores.fillerCount)}`}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm font-semibold">{scores.fillerCount}</span>
          <span className="text-xs font-medium">Filler Words</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        {/* Score Bars */}
        <div className="space-y-5">
          {scoreItems.map((score, index) => {
            const percentage = Math.round((score.value / score.maxScore) * 100);
            const TrendIcon = getTrendIcon(percentage);

            return (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{score.name}</span>
                  <div className="flex items-center gap-2">
                    <TrendIcon className={`h-4 w-4 ${getScoreColor(percentage)}`} />
                    <span className={`text-sm font-semibold ${getScoreColor(percentage)}`}>
                      {score.value}/{score.maxScore}
                    </span>
                  </div>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Score Circle */}
        <div className="flex items-center justify-center lg:justify-start">
          <div className="relative flex h-36 w-36 items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              {/* Progress Circle */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={overallScore >= 75 ? '#10b981' : overallScore >= 50 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                strokeDasharray={`${(overallScore / 100) * 326.73} 326.73`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            {/* Score Text */}
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Overall
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
