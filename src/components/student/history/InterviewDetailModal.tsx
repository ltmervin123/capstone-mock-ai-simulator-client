import InterviewFeedback from './InterviewFeedback';
import InterviewScores from './InterviewScores';
import InterviewSummary from './InterviewSummary';
import { useEffect, useRef, useState } from 'react';
import Controller from './Controller';
import { useGetInterviewDetail } from '@/queries/student/useInterviewHistory';
import { updateUnViewedInterviewCount } from '@/queries/student/useNotification';
import Spinner from '../../ui/spinner';
import InterviewDetailHeader from './InterviewDetailHeader';
import { useQueryClient } from '@tanstack/react-query';
import authStore from '@/stores/public/auth-store';

type InterviewDetailProps = {
  historyId: string;
  isViewed: boolean;
  onClose: () => void;
};

export default function InterviewDetail({ onClose, historyId, isViewed }: InterviewDetailProps) {
  const user = authStore((state) => state.user);
  const { data: interviewDetail, isFetching, isError, error } = useGetInterviewDetail(historyId!);
  const { mutate: updateUnViewedCount } = updateUnViewedInterviewCount({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['un-viewed-interview-count'] });
      queryClient.invalidateQueries({ queryKey: ['interview-history'] });
    },
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const queryClient = useQueryClient();
  const isUpdated = useRef(false);
  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isViewed && !isUpdated.current) {
      isUpdated.current = true;
      updateUnViewedCount(
        { interviewId: historyId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['un-viewed-interview-count'] });
            queryClient.invalidateQueries({ queryKey: ['interview-history'] });
          },
        }
      );
    }
  }, [historyId]);

  const handlePrint = async () => {
    if (!interviewDetail) return;

    try {
      setIsPrinting(true);
      const html2pdf = (await import('html2pdf.js')).default;
      if (!html2pdf) {
        return;
      }

      const studentName = `${user?.firstName}-${user?.lastName}`;
      const formattedDate = new Date(interviewDetail.createdAt ?? Date.now())
        .toISOString()
        .split('T')[0];

      // Create a container for all content
      const printContainer = document.createElement('div');
      // Add summary section
      const summaryDiv = document.createElement('div');

      summaryDiv.innerHTML = `
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">Interview Summary</h1>
          <p style="color: #666; margin-bottom: 16px;">Review your performance and feedback</p>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 16px;">
            <div><strong>Type:</strong> ${interviewDetail.interviewType}</div>
            <div><strong>Date:</strong> ${new Date(interviewDetail.createdAt!).toLocaleDateString()}</div>
            <div><strong>Duration:</strong> ${interviewDetail.duration}</div>
            <div><strong>Questions:</strong> ${interviewDetail.numberOfQuestions}</div>
          </div>
        </div>
      `;
      printContainer.appendChild(summaryDiv);

      // Add scores section
      const scoresDiv = document.createElement('div');
      scoresDiv.innerHTML = `
        <div style="margin-bottom: 24px; page-break-inside: avoid;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">Performance Scores</h2>
          <div style="margin-bottom: 12px;"><strong>Grammar:</strong> ${interviewDetail.scores.grammar}/100</div>
          <div style="margin-bottom: 12px;"><strong>Skills:</strong> ${interviewDetail.scores.skills}/100</div>
          <div style="margin-bottom: 12px;"><strong>Experience:</strong> ${interviewDetail.scores.experience}/100</div>
          <div style="margin-bottom: 12px;"><strong>Relevance:</strong> ${interviewDetail.scores.relevance}/100</div>
          <div style="margin-bottom: 12px;"><strong>Filler count:</strong> ${interviewDetail.scores.fillerCount}</div>
          <div style="font-size: 18px; font-weight: bold; margin-top: 16px;">Overall: ${interviewDetail.scores.totalScore}/100</div>
        </div>
      `;
      printContainer.appendChild(scoresDiv);

      interviewDetail.feedbacks.forEach((feedback, index) => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'question-card';
        feedbackDiv.style.pageBreakInside = 'avoid';
        feedbackDiv.style.marginBottom = '24px';

        feedbackDiv.innerHTML = `
    <div style="">
      <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">Question ${index + 1} of ${interviewDetail.feedbacks.length}</h3>

      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="color: #3b82f6; font-weight: 600;">QUESTION</span>
        </div>
        <div style="text-align: left;">
          ${feedback.question}
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="color: #10b981; font-weight: 600;">YOUR ANSWER</span>
        </div>
        <div style="text-align: left;">
          ${feedback.answer}
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="color: #8b5cf6; font-weight: 600;">FEEDBACK</span>
        </div>
        <div style="text-align: left;">
          ${feedback.answerFeedback}
        </div>
      </div>

      <div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="color: #f59e0b; font-weight: 600;">AREAS TO IMPROVE</span>
        </div>
        <div style="text-align: left;">
          ${feedback.areaOfImprovement}
        </div>
      </div>
    </div>
  `;
        printContainer.appendChild(feedbackDiv);
      });

      const options = {
        margin: 0.5,
        filename: `Interview-Result-${studentName}-${formattedDate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: '.question-card' },
      } as const;

      await html2pdf().set(options).from(printContainer).save();
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsPrinting(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative mx-4 w-full max-w-5xl rounded-2xl p-8">
          <Spinner
            type="fullscreen"
            width="w-16"
            height="h-16"
            message="Loading interview details..."
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Error Loading Interview</h3>
          <p className="mb-6 text-sm text-gray-600">{error.message}</p>
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="border-b border-gray-200 px-6 py-5 sm:px-8">
          <InterviewDetailHeader onClose={onClose} onPrint={handlePrint} isPrinting={isPrinting} />
        </div>

        {/* Scrollable content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-6 sm:px-8" ref={printRef}>
          <div className="space-y-6">
            <InterviewSummary
              type={interviewDetail?.interviewType!}
              date={interviewDetail?.createdAt!}
              duration={interviewDetail?.duration!}
              questions={interviewDetail?.numberOfQuestions!}
            />
            <InterviewScores scores={interviewDetail?.scores!} />
            <InterviewFeedback
              question={interviewDetail?.feedbacks[currentQuestionIndex].question!}
              answer={interviewDetail?.feedbacks[currentQuestionIndex].answer!}
              areaOfImprovement={
                interviewDetail?.feedbacks[currentQuestionIndex].areaOfImprovement!
              }
              feedback={interviewDetail?.feedbacks[currentQuestionIndex].answerFeedback!}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 px-6 py-4 sm:px-8">
          <Controller
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            data={interviewDetail?.feedbacks!}
          />
        </div>
      </div>
    </div>
  );
}
