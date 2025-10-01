import { Clock } from 'lucide-react';

type QuestionSectionProps = {
  currentQuestion: string;
  questionHistory: number;
  numberOfQuestions: number;
  questionIndex: number;
  setIsHistoryModalOpen: (isOpen: boolean) => void;
};

export default function QuestionSection({
  currentQuestion,
  questionHistory,
  numberOfQuestions,
  questionIndex,
  setIsHistoryModalOpen,
}: QuestionSectionProps) {
  return (
    <div className="mb-6 rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Question {questionIndex + 1} of {numberOfQuestions}
          </h2>
          <p className="text-lg font-medium leading-relaxed text-slate-800 md:text-xl">
            {currentQuestion}
          </p>
        </div>
        {questionHistory > 0 && (
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-slate-100 px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-200"
            title="View History"
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
              {questionHistory}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
