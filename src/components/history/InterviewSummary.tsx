import { Printer } from 'lucide-react';
import { InterviewType } from '@/types/shared/interview-type';

type InterviewSummaryProps = {
  type: InterviewType;
  date: string;
  duration: string;
  questions: number;
};

export default function InterviewSummary({
  type,
  date,
  duration,
  questions,
}: InterviewSummaryProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Interview Summary</h1>
        <button
          className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          title="Print Interview Summary"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
      </div>
      <h2 className="mb-3 text-lg font-semibold text-gray-700">{type} Interview</h2>
      <p className="text-sm text-gray-600">
        {date} — {duration} — {questions} questions
      </p>
    </div>
  );
}
