import { MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

type InterviewFeedbackProps = {
  question: string;
  answer: string;
  feedback: string;
  areaOfImprovement: string;
};

export default function InterviewFeedback({
  question,
  answer,
  feedback,
  areaOfImprovement
}: InterviewFeedbackProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Question Feedback</h2>

      <div className="space-y-6">
        {/* Question */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Question</h3>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm leading-relaxed text-gray-700">{question}</p>
          </div>
        </div>

        {/* Your Answer */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Your Answer</h3>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm leading-relaxed text-gray-700">{answer}</p>
          </div>
        </div>

        {/* Feedback */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Feedback</h3>
          </div>
          <div className="rounded-lg bg-purple-50 p-4">
            <p className="text-sm leading-relaxed text-gray-700">{feedback}</p>
          </div>
        </div>

        {/* Areas of Improvement */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Areas to Improve</h3>
          </div>
          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
            <p className="text-sm leading-relaxed text-gray-700">{areaOfImprovement}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
