import { InterviewType } from '@/types/shared/interview-type';
import HistoryCard from './HistoryCard';
import Pagination from '../ui/pagination';
import { useState } from 'react';

const MOCK_HISTORY = [
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Basic',
    date: 'April 15, 2025',
    duration: '10:50 minutes',
    questions: 5,
    score: 75,
    totalScore: 100,
  },
  {
    type: 'Behavioral',
    date: 'April 10, 2025',
    duration: '15:30 minutes',
    questions: 7,
    score: 60,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
  {
    type: 'Expert',
    date: 'April 5, 2025',
    duration: '20:00 minutes',
    questions: 10,
    score: 85,
    totalScore: 100,
  },
];

export default function HistoryTableSection() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4">
      <h1 className="semi-bold text-xl text-gray-500">Interview Session</h1>
      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
        {MOCK_HISTORY.map((history, index) => (
          <HistoryCard
            key={index}
            type={history.type as InterviewType}
            date={history.date}
            duration={history.duration}
            questions={history.questions}
            score={history.score}
            totalScore={history.totalScore}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={MOCK_HISTORY.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
