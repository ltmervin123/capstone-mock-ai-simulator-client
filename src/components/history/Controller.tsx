type ControllerProps = {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  data: {
    question: string;
    answer: string;
    areaOfImprovement: string;
    answerFeedback: string;
  }[];
};

export default function Controller({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  data,
}: ControllerProps) {
  return (
    <div className="mt-4 flex items-center justify-center space-x-4">
      <button
        onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
        disabled={currentQuestionIndex === 0}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <span className="text-sm font-medium text-gray-700">
        {currentQuestionIndex + 1}/{data.length}
      </span>

      <button
        onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, data.length - 1))}
        disabled={currentQuestionIndex === data.length - 1}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
