import { Printer, X } from 'lucide-react';
import Modal from '@/layouts/Modal';
import authStore from '@/stores/public/auth-store';
import { useGetInterview } from '@/queries/admin/useReport';
import { getScoreColor } from '@/utils/handle-color-metrics';
import { handleDateString } from '@/utils/handle-dates';
import { handleNames } from '@/utils/handle-names';
import Spinner from '@/components/ui/spinner';

type Props = {
  onClose: () => void;
  interviewId: string;
};

export default function ResultSummaryModal({ onClose, interviewId }: Props) {
  const user = authStore((state) => state.user);
  const { data: interview, isLoading, isError } = useGetInterview(user!, interviewId);

  const handlePrint = () => {
    window.print();
  };

  console.log(interview);

  if (isLoading) {
    return (
      <Modal>
        <div className='className="flex print:shadow-none" max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-lg print:max-h-none print:min-h-[297mm] print:w-[210mm] print:max-w-none print:rounded-none print:bg-white print:p-0'>
          <Spinner
            type="fullscreen"
            width="w-16"
            height="h-16"
            message="Loading interview details..."
          />
        </div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal>
        <div className='className="flex print:shadow-none" flex h-[90vh] w-full max-w-3xl items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg print:max-h-none print:min-h-[297mm] print:w-[210mm] print:max-w-none print:rounded-none print:bg-white print:p-0'>
          <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-xl font-semibold text-gray-900 print:text-black">
              Error Loading Interview
            </h2>
            <p className="mt-4 text-sm text-gray-600 print:text-black">
              There was an error fetching the interview details. Please try again later.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 print:hidden"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-lg print:max-h-none print:min-h-[297mm] print:w-[210mm] print:max-w-none print:rounded-none print:bg-white print:p-0 print:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6 print:border-b-2 print:border-black print:bg-white print:px-12 print:py-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 print:text-black">
              Interview Report
            </h2>
            <p className="mt-2 text-sm text-gray-500 print:text-black">
              {handleDateString(interview!.createdAt!)}
            </p>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="rounded border border-gray-300 bg-white p-2 transition hover:bg-gray-100"
              title="Print/Download PDF"
            >
              <Printer className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={onClose}
              className="rounded border border-gray-300 bg-white p-2 transition hover:bg-gray-100"
              title="Close"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 print:overflow-visible print:px-12 print:py-8">
          {/* Student Info */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500 print:text-black">Student Name</p>
                <p className="font-medium text-gray-900 print:text-black">
                  {handleNames(interview!.student)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 print:text-black">Interview Type</p>
                <p className="font-medium text-gray-900 print:text-black">
                  {interview!.interviewType}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 print:text-black">Duration</p>
                <p className="font-medium text-gray-900 print:text-black">{interview!.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 print:text-black">Questions</p>
                <p className="font-medium text-gray-900 print:text-black">
                  {interview!.numberOfQuestions}
                </p>
              </div>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-3 print:grid-cols-6 print:gap-2">
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Grammar</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(interview!.scores.grammar)} print:text-base`}
                >
                  {interview!.scores.grammar}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Experience</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(interview!.scores.experience)} print:text-base`}
                >
                  {interview!.scores.experience}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Skills</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(interview!.scores.skills)} print:text-base`}
                >
                  {interview!.scores.skills}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Relevance</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(interview!.scores.relevance)} print:text-base`}
                >
                  {interview!.scores.relevance}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Fillers</p>
                <p className="text-xl font-semibold text-gray-700 print:text-base">
                  {interview!.scores.fillerCount}
                </p>
              </div>
              <div className="rounded border border-gray-400 bg-white p-3 text-center print:p-2">
                <p className="text-xs font-bold text-gray-700 print:text-[10px]">TOTAL</p>
                <p
                  className={`text-xl font-bold ${getScoreColor(interview!.scores.totalScore)} print:text-base`}
                >
                  {interview!.scores.totalScore}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-gray-900 print:text-black">
                Assessment Details
              </h3>
            </div>
            <div className="space-y-6 print:space-y-3">
              {interview!.feedbacks.map((feedback, index) => (
                <div
                  key={feedback.question + index}
                  className="rounded border border-gray-200 bg-white print:break-inside-avoid print:rounded print:border print:bg-white"
                >
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 print:px-3 print:py-1.5">
                    <p className="text-sm font-semibold text-gray-800 print:text-xs">
                      <span className="mr-2 inline-block h-6 w-6 rounded-full bg-gray-200 text-center leading-6 text-gray-700 print:h-5 print:w-5 print:text-[10px] print:leading-5">
                        {index + 1}
                      </span>
                      {feedback.question}
                    </p>
                  </div>
                  <div className="space-y-2 p-4 print:space-y-1.5 print:p-3">
                    <div>
                      <p className="mb-1 text-xs font-medium text-gray-500 print:text-[10px]">
                        Response:
                      </p>
                      <p className="text-sm text-gray-800 print:text-[11px]">{feedback.answer}</p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="mb-0.5 text-xs font-medium text-gray-500 print:text-[10px]">
                        Area for Improvement:
                      </p>
                      <p className="text-sm text-gray-700 print:text-[11px]">
                        {feedback.areaOfImprovement}
                      </p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="mb-0.5 text-xs font-medium text-gray-500 print:text-[10px]">
                        Recommendation:
                      </p>
                      <p className="text-sm text-gray-700 print:text-[11px]">
                        {feedback.answerFeedback}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
