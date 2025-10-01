import { Clock, X } from 'lucide-react';
import { useId } from 'react';

type QuestionHistory = {
  question: string;
  timestamp: string;
  answer: string;
};

type QuestionHistoryProps = {
  questionHistory: QuestionHistory[];
  setIsHistoryModalOpen: (isOpen: boolean) => void;
};

export default function HistoryModal({
  questionHistory,
  setIsHistoryModalOpen,
}: QuestionHistoryProps) {
  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-slideUp flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
              <Clock className="h-6 w-6 text-blue-600" />
              Interview History
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Review your previous questions and responses
            </p>
          </div>
          <button
            onClick={() => setIsHistoryModalOpen(false)}
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-slate-100"
            title="Close"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {questionHistory.length === 0 ? (
            <div className="py-12 text-center">
              <Clock className="mx-auto mb-4 h-16 w-16 text-slate-300" />
              <p className="text-lg text-slate-500">No history yet</p>
              <p className="mt-2 text-sm text-slate-400">
                Answer questions to see them appear here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {questionHistory.map((item, index) => (
                <div
                  key={useId()}
                  className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 transition-shadow duration-200 hover:shadow-md"
                >
                  {/* Question Number and Timestamp */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                        {index + 1}
                      </span>
                      Question {index + 1}
                    </span>
                    <span className="text-xs text-slate-500">{item.timestamp}</span>
                  </div>

                  {/* Question */}
                  <div className="mb-4">
                    <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      Question
                    </h3>
                    <p className="pl-4 text-base font-medium leading-relaxed text-slate-800 md:text-lg">
                      {item.question}
                    </p>
                  </div>

                  {/* User Response */}
                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Your Response
                    </h3>
                    <p className="rounded-lg bg-green-50/50 p-4 pl-4 leading-relaxed text-slate-700">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Total Questions Answered:{' '}
              <span className="font-bold text-slate-800">{questionHistory.length}</span>
            </p>
            <button
              onClick={() => setIsHistoryModalOpen(false)}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
