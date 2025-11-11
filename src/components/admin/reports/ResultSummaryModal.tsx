import { Printer, X } from 'lucide-react';
import Modal from '@/layouts/Modal';
import authStore from '@/stores/public/auth-store';
import { useGetInterview } from '@/queries/admin/useReport';
import { getScoreColor } from '@/utils/handle-color-metrics';
import { handleDateString } from '@/utils/handle-dates';
import { handleNames } from '@/utils/handle-names';
import Spinner from '@/components/ui/spinner';
import { useRef, useState } from 'react';

type Props = {
  onClose: () => void;
  interviewId: string;
};

export default function ResultSummaryModal({ onClose, interviewId }: Props) {
  const user = authStore((state) => state.user);
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { data: interview, isLoading, isError } = useGetInterview(user!, interviewId);

  const handlePrint = async () => {
    if (!printRef.current || !interview) {
      return;
    }

    const target = printRef.current.cloneNode(true) as HTMLDivElement;

    target.querySelectorAll('p').forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.position = 'relative';
        el.style.top = '-8px';
      }
    });

    try {
      setIsExporting(true);
      const html2pdf = (await import('html2pdf.js')).default;
      if (!html2pdf) {
        return;
      }

      const studentName = handleNames(interview.student)
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/gi, '')
        .toLowerCase();
      const formattedDate = new Date(interview.createdAt ?? Date.now()).toISOString().split('T')[0];

      const options = {
        margin: 0.0,
        filename: `prepwise-interview-${studentName}-${formattedDate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: '.question-card' },
      } as const;

      await html2pdf().set(options).from(target).save();
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <Modal>
        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-lg">
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
        <div className="flex h-[90vh] w-full max-w-3xl items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-xl font-semibold text-gray-900">Error Loading Interview</h2>
            <p className="mt-4 text-sm text-gray-600">
              There was an error fetching the interview details. Please try again later.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100"
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
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Interview Report</h2>
            <p className="mt-2 text-sm text-gray-500">{handleDateString(interview!.createdAt!)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="rounded border border-gray-300 bg-white p-2 transition hover:bg-gray-100 disabled:opacity-50"
              title="Print/Download PDF"
              disabled={isExporting}
            >
              {isExporting ? (
                <Spinner width="h-5" height="w-5" />
              ) : (
                <Printer className="h-5 w-5 text-gray-700" />
              )}
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
        <div className="flex-1 overflow-y-auto px-8 py-8" ref={printRef}>
          {/* Student Info */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Student Name</p>
                <p className="font-medium text-gray-900">{handleNames(interview!.student)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Interview Type</p>
                <p className="font-medium text-gray-900">{interview!.interviewType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-medium text-gray-900">{interview!.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Questions</p>
                <p className="font-medium text-gray-900">{interview!.numberOfQuestions}</p>
              </div>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded border border-gray-200 bg-white p-3 text-center">
                <p className="text-xs text-gray-500">Grammar</p>
                <p className={`text-xl font-semibold ${getScoreColor(interview!.scores.grammar)} `}>
                  {interview!.scores.grammar}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center">
                <p className="text-xs text-gray-500">Experience</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(interview!.scores.experience)} `}
                >
                  {interview!.scores.experience}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center">
                <p className="text-xs text-gray-500">Skills</p>
                <p className={`text-xl font-semibold ${getScoreColor(interview!.scores.skills)} `}>
                  {interview!.scores.skills}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center">
                <p className="text-xs text-gray-500">Relevance</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(interview!.scores.relevance)} `}
                >
                  {interview!.scores.relevance}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center">
                <p className="text-xs text-gray-500">Fillers</p>
                <p className="text-xl font-semibold text-gray-700">
                  {interview!.scores.fillerCount}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center">
                <p className="text-xs font-bold text-gray-700">TOTAL</p>
                <p className={`text-xl font-bold ${getScoreColor(interview!.scores.totalScore)} `}>
                  {interview!.scores.totalScore}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-gray-900">Assessment Details</h3>
            </div>
            <div className="space-y-6">
              {interview!.feedbacks.map((feedback, index) => (
                <div
                  key={feedback.question + index}
                  className="question-card rounded border border-gray-200 bg-white"
                >
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-2">
                    <p className="text-sm font-semibold text-gray-800">{`${index + 1}. ${feedback.question}`}</p>
                  </div>
                  <div className="space-y-2 p-4">
                    <div>
                      <p className="mb-1 text-xs font-medium text-gray-500">Response:</p>
                      <p className="text-sm text-gray-800">{feedback.answer}</p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="mb-0.5 text-xs font-medium text-gray-500">
                        Area for Improvement:
                      </p>
                      <p className="text-sm text-gray-700">{feedback.areaOfImprovement}</p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="mb-0.5 text-xs font-medium text-gray-500">Recommendation:</p>
                      <p className="text-sm text-gray-700">{feedback.answerFeedback}</p>
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
