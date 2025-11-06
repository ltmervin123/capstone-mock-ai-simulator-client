import { interviewType } from '@/types/student/interview-option-type';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';

type DashboardCardsProps = {
  interviewsCount: number;
  averageScores: number;
  highestScores: {
    interviewType: interviewType;
    createdAt: string;
    score: number;
  };
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export default function DashboardCards({
  interviewsCount,
  averageScores,
  highestScores,
}: DashboardCardsProps) {
  const navigate = useNavigate();

  if (interviewsCount === 0 && averageScores === 0 && highestScores === null) {
    return (
      <div className="col-span-full rounded bg-white p-6 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">No interviews yet</h2>
        <p className="mt-2 text-gray-600">
          You haven't had any interview sessions. Start a new mock interview to see your performance
          stats here.
        </p>
        <div className="mt-4">
          <Button
            className="min-h-[50px] rounded-3xl bg-green-700 hover:bg-green-600"
            onClick={() => navigate('/user/interview')}
          >
            Start your first interview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:text-left">
        <h1 className="text-2xl font-semibold">Total Interviews</h1>
        <h1 className="text-4xl font-bold text-green-700">{interviewsCount}</h1>
        <p className="font-normal">{interviewsCount !== 1 ? 'sessions' : 'session'}</p>
      </div>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:text-left">
        <h1 className="text-2xl font-semibold">Average Scores</h1>
        <h1 className="text-4xl font-bold text-green-700">{averageScores}%</h1>
        <p className="font-normal">overall</p>
      </div>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:col-span-1 md:text-left">
        <h1 className="text-2xl font-semibold">Current Best</h1>
        <h1 className="text-4xl font-bold text-green-700">{highestScores?.score}</h1>
        <p className="font-normal">{highestScores?.interviewType} Interview</p>
        <p className="font-normal">{formatDate(highestScores?.createdAt)}</p>
      </div>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:col-span-1 md:text-left">
        <h1 className="text-2xl font-semibold">Quick Start</h1>
        <Button
          className="mt-4 min-h-[50px] rounded-3xl bg-green-700 hover:bg-green-600"
          onClick={() => navigate('/user/interview')}
        >
          New Interview
        </Button>
      </div>
    </>
  );
}
