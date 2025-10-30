import { ChevronLeft, ChevronRight } from 'lucide-react';

type ControllerProps = {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  data: any[];
};

export default function Controller({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  data,
}: ControllerProps) {
  const totalQuestions = data?.length || 0;
  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < totalQuestions - 1;

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
        disabled={!canGoPrevious}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Question Indicator */}
      <div className="flex items-center gap-2">
        <div className="text-center">
          <p className="text-xs text-gray-500">Question</p>
          <p className="text-sm font-semibold text-gray-900">
            {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>
        <div className="hidden gap-1 sm:flex">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentQuestionIndex ? 'w-8 bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        disabled={!canGoNext}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
