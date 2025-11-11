import { handleDateFormat } from '@/utils/handle-dates';
import { Calendar, Clock, FileText, ChevronRight } from 'lucide-react';

type InterviewHistoryProps = {
  interviewType: string;
  totalScore: number;
  createdAt: Date;
  duration: string;
  numberOfQuestions: number;
};

const mockInterviews = [
  {
    _id: '68fa209b5c311beedc95a729',
    interviewType: 'Basic',
    duration: '5m 43s',
    numberOfQuestions: 5,
    createdAt: new Date('2025-10-23T12:33:31.696Z'),
    totalScore: 51,
  },
  {
    _id: '68f8d6865d7c70e14b60a804',
    interviewType: 'Behavioral',
    duration: '2m 25s',
    numberOfQuestions: 5,
    createdAt: new Date('2025-10-22T13:05:10.013Z'),
    totalScore: 44,
  },
  {
    _id: '68f8d6865d7c70e14b60a805',
    interviewType: 'Expert',
    duration: '8m 12s',
    numberOfQuestions: 8,
    createdAt: new Date('2025-10-21T09:15:22.013Z'),
    totalScore: 72,
  },
  {
    _id: '68f8d6865d7c70e14b60a806',
    interviewType: 'Basic',
    duration: '4m 35s',
    numberOfQuestions: 5,
    createdAt: new Date('2025-10-20T14:22:45.013Z'),
    totalScore: 38,
  },
];

const getScoreColor = (score: number) => {
  if (score >= 70) return 'text-green-600 bg-green-50';
  if (score >= 50) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export default function InterviewHistory() {
  return (
    <>
      {mockInterviews.map((interview: InterviewHistoryProps) => {
        return (
          <div className="group rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-green-500 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {interview.interviewType}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${getScoreColor(interview.totalScore)}`}
                  >
                    Score: {interview.totalScore}%
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{handleDateFormat(interview.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    <span>Duration: {interview.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText size={16} className="text-gray-400" />
                    <span>{interview.numberOfQuestions} Questions</span>
                  </div>
                </div>
              </div>

              <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600 group-hover:text-green-600">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
