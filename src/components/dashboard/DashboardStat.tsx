import ProgressBar from '../../layouts/ProgressBar';
import InterviewTypeScoreBar from '../../layouts/InterviewTypeScoreBar';

export type PerformanceBreakdown = {
  grammar: number;
  experience: number;
  skills: number;
  relevance: number;
};

export type InterviewTypeScore = {
  basic: number;
  behavioral: number;
  expert: number;
};

export type DashboardStatProps = {
  performanceBreakDown?: PerformanceBreakdown;
  interviewTypeScores?: InterviewTypeScore;
};

export default function DashboardStat({
  performanceBreakDown,
  interviewTypeScores,
}: DashboardStatProps) {
  const performanceData = performanceBreakDown
    ? [
        {
          label: 'Grammar',
          value: performanceBreakDown.grammar,
        },
        {
          label: 'Skills',
          value: performanceBreakDown.skills,
        },
        {
          label: 'Experience',
          value: performanceBreakDown.experience,
        },
        {
          label: 'Relevance',
          value: performanceBreakDown.relevance,
        },
      ]
    : [];

  const interviewScores = interviewTypeScores
    ? [
        {
          type: 'Basic Interview',
          score: interviewTypeScores.basic,
        },
        {
          type: 'Behavioral Interview',
          score: interviewTypeScores.behavioral,
        },
        {
          type: 'Expert Interview',
          score: interviewTypeScores.expert,
        },
      ]
    : [];
  return (
    <>
      {/* Performance Breakdown */}
      <div className="grid h-auto w-full rounded bg-white p-4 font-inter shadow-sm">
        <h1 className="mb-2 text-lg font-bold text-green-700">Performance Breakdown</h1>
        <div className="grid auto-rows-auto gap-y-2 sm:gap-y-3">
          {performanceData.map((item, index) => (
            <ProgressBar key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>

      {/* Interview Scores */}
      <div className="grid-cols-1rounded grid h-auto gap-3 bg-white p-4">
        <h1 className="mb-2 text-lg font-bold text-green-700">Interview Type Scores</h1>

        {interviewScores.map((item, index) => (
          <InterviewTypeScoreBar key={index} type={item.type} score={item.score} />
        ))}
      </div>
    </>
  );
}
