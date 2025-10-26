import { handleDateFormat } from '@/utils/handleDates';
import { Calendar, Clock, FileText, Tag } from 'lucide-react';

type InterviewSummaryProps = {
  type: string;
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
  const stats = [
    { icon: Tag, label: 'Interview Type', value: type, color: 'text-blue-600' },
    { icon: Calendar, label: 'Date', value: handleDateFormat(date), color: 'text-green-600' },
    { icon: Clock, label: 'Duration', value: duration, color: 'text-purple-600' },
    {
      icon: FileText,
      label: 'Questions',
      value: `${questions} questions`,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.color} bg-opacity-10`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {stat.label}
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
