import { InterviewType } from '@/types/shared/interview-type';
import { handleDateFormat } from '@/utils/handleDates';

type InterviewSummaryProps = {
  type: InterviewType;
  date: Date;
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
      <h2 className="mb-3 text-lg font-semibold text-gray-700">{type} Interview</h2>
      <p className="text-sm text-gray-600">
        {handleDateFormat(date)} — {duration} — {questions} questions
      </p>
    </div>
  );
}
