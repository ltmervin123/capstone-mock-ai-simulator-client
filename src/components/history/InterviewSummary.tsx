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
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Interview Summary</h1>
      <h2 className="mb-3 text-lg font-semibold text-gray-700">{type} Interview</h2>
      <p className="text-sm text-gray-600">
        {date} — {duration} — {questions} questions
      </p>
    </div>
  );
}
