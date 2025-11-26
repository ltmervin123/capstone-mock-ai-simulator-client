type QuestionProgressProps = {
  questions: string[];
  questionIndex: number;
};

const QuestionProgress = ({ questions, questionIndex }: QuestionProgressProps) => {
  const progressPercentage = ((questionIndex + 1) / questions.length) * 100;

  return (
    <div className="mb-6 rounded-xl bg-white p-4 shadow-lg sm:p-5">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700 sm:text-base">Question Progress</h3>
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 sm:px-3 sm:text-sm">
          {questionIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionProgress;
