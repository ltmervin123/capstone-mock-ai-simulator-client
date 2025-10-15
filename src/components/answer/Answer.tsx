import { useState } from 'react';
import PreviewSection from './PreviewSection';
import HistoryModal from './HistoryModal';
import AIResponse from './AIResponse';
import ControlPanel from './ControlPanel';
import GettingStarted from './GettingStarted';
import useRecord from '../../hooks/answer/useRecord';
import useGreeting from '../../hooks/answer/useGreeting';
import useQuestion from '@/hooks/answer/useQuestion';
import useSpeak from '@/hooks/answer/useSpeak';
import interviewStore from '@/stores/interview-store';
import socketStore from '@/stores/socket-io-store';
import Modal from '@/layouts/Modal';
import Spinner from '../ui/spinner';
import { useGreetingResponse } from '@/queries/useInterview';
import authStore from '@/stores/auth-store';
import { useNavigate } from 'react-router-dom';
import { useMakeInterviewFeedback } from '@/queries/useInterview';

const InterviewPage = () => {
  const navigate = useNavigate();
  const user = authStore((state) => state.user);
  const connected = socketStore((state) => state.connected);
  const interviewOption = interviewStore((state) => state.interviewOption);
  const interviewConversation = interviewStore((state) => state.interviewConversation);
  const setInterviewConversation = interviewStore((state) => state.setInterviewConversation);
  const startAt = interviewStore((state) => state.startAt);
  const endAt = interviewStore((state) => state.endAt);
  const setStartAt = interviewStore((state) => state.setStartAt);
  const aiResponse = interviewStore((state) => state.aiResponse);
  const setAiResponse = interviewStore((state) => state.setAiResponse);
  const { mutate: sendGreeting, isPending: isSendingGreetingResponse } = useGreetingResponse();
  const { isPlaying: isAISpeaking, isLoading: isSpeakingLoading, handleSpeak } = useSpeak();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [hasNoAnswer, setHasNoAnswer] = useState(false);
  const { AIIntroductionMessage, isGreeting, setIsGreeting } = useGreeting();
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const {
    isInterviewActive,
    isCameraOn,
    videoRef,
    finalAnswer,
    realTimeTranscription,
    isUserSpeaking,
    isInitializing,
    hasPermissionError,
    isRecording,
    stopCamera,
    toggleCamera,
    setIsInterviewActive,
    setIsRecording,
    startRecording,
    stopRecording,
    startCamera,
  } = useRecord();
  const {
    questions,
    currentQuestion,
    questionHistory,
    isGeneratingQuestion,
    isInterviewEnd,
    setQuestionHistory,
    makeQuestions,
    setCurrentQuestion,
    setIsInterviewEnd,
    handleNextQuestion,
  } = useQuestion();

  const { mutate: makeFeedback, isPending } = useMakeInterviewFeedback({
    onSuccess: () => {
      setIsInterviewEnd(false);
      setIsShowSuccessModal(true);
    },
    onError: (error: Error) => {
      console.error('Error making interview feedback:', error.message);
    },
  });

  const nextQuestion = () => {
    if (finalAnswer.trim() === '') {
      setHasNoAnswer(true);
      return;
    }

    if (isGreeting) {
      sendGreeting(
        {
          userName: user?.firstName!,
          interviewType: interviewOption?.interviewType!,
          interviewerName: interviewOption?.selectedInterviewee!,
          conversation: { AI: AIIntroductionMessage, CANDIDATE: finalAnswer },
        },
        {
          onSuccess: (data) => {
            setAiResponse(data);
          },
          onError: (error) => {
            console.error('Error fetching greeting response:', (error as Error).message);
          },
        }
      );
      setIsGreeting(false);
      return;
    }

    const updatedConversation = [
      ...interviewConversation,
      { AI: currentQuestion, CANDIDATE: finalAnswer },
    ];

    setInterviewConversation(updatedConversation);

    if (currentQuestion) {
      const newHistoryItem = {
        id: Date.now(),
        question: currentQuestion,
        userResponse: finalAnswer,
        timestamp: new Date().toLocaleTimeString(),
      };

      setQuestionHistory((prev) => [...prev, newHistoryItem]);
    }

    handleNextQuestion(updatedConversation);
  };

  const startInterview = async () => {
    setIsInterviewActive(true);

    await startCamera(AIIntroductionMessage);

    setStartAt(new Date());
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setCurrentQuestion('');
    stopCamera();
  };

  const handleInterviewDuration = (startAt: Date, endAt: Date) => {
    const duration = Math.floor((endAt.getTime() - startAt.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Video Grid */}
        <PreviewSection
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          isCameraOn={isCameraOn}
          isInterviewActive={isInterviewActive}
          videoRef={videoRef as React.RefObject<HTMLVideoElement>}
          isAISpeaking={isAISpeaking}
          isUserSpeaking={isUserSpeaking}
          realTimeTranscription={realTimeTranscription}
          stopRecording={stopRecording}
        />

        {/* AI Response Area */}
        {isInterviewActive && (
          <AIResponse
            aiResponse={aiResponse}
            handleSpeak={handleSpeak}
            selectedVoice={interviewOption?.selectedInterviewee!}
            isInitializing={isInitializing}
            hasPermissionError={hasPermissionError}
            isInterviewEnd={isInterviewEnd}
          />
        )}

        {/* Control Panel */}
        <ControlPanel
          isInterviewActive={isInterviewActive}
          isCameraOn={isCameraOn}
          startInterview={startInterview}
          endInterview={endInterview}
          toggleCamera={toggleCamera}
          setIsHistoryModalOpen={setIsHistoryModalOpen}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          nextQuestion={nextQuestion}
          questions={questions}
          isSpeakingLoading={isSpeakingLoading}
          isAISpeaking={isAISpeaking}
          startRecording={startRecording}
          stopRecording={stopRecording}
          isSendingGreetingResponse={isSendingGreetingResponse}
          makeQuestions={makeQuestions}
          isGeneratingQuestion={isGeneratingQuestion}
          isInitializing={isInitializing}
          hasPermissionError={hasPermissionError}
          isGreeting={isGreeting}
        />

        {!isInterviewActive && <GettingStarted />}

        {/* Interview History Modal */}
        {isHistoryModalOpen && (
          <HistoryModal
            questionHistory={questionHistory}
            setIsHistoryModalOpen={setIsHistoryModalOpen}
            interviewType={interviewOption?.interviewType!}
          />
        )}
      </div>
      {!connected && (
        <Modal>
          <Spinner type="fullscreen" width="w-32" height="h-32" message="Connecting..." />
        </Modal>
      )}

      {isInitializing && (
        <Modal>
          <Spinner
            type="fullscreen"
            width="w-32"
            height="h-32"
            message="Initializing permissions..."
          />
        </Modal>
      )}

      {hasPermissionError && (
        <Modal>
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl bg-white p-6 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-red-600">Camera Permission Denied</h2>
            <p className="text-gray-700">
              We need access to your camera for the interview. Please enable camera permissions in
              your browser settings and refresh the page.
            </p>
            <button
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white"
              onClick={() => startCamera(AIIntroductionMessage)}
            >
              Try Again
            </button>
          </div>
        </Modal>
      )}

      {hasNoAnswer && (
        <Modal>
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl bg-white p-6 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-red-600">No Answer Provided</h2>
            <p className="text-gray-700">Please provide an answer before proceeding.</p>
            <button
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white"
              onClick={() => setHasNoAnswer(false)}
            >
              Try Again
            </button>
          </div>
        </Modal>
      )}

      {isInterviewEnd && (
        <Modal>
          <div className="flex w-full max-w-4xl flex-col rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-700">Interview Complete</h2>
              {startAt && endAt && (
                <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm">
                  <span className="font-medium">Duration: </span>
                  {handleInterviewDuration(startAt, endAt)}
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Your interview has concluded. Please review the conversation below before
                submitting.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm">
                  <span className="font-medium">Interview Type: </span>
                  {interviewOption?.interviewType}
                </div>
                <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm">
                  <span className="font-medium">Questions Answered: </span>
                  {questions.length}
                </div>
              </div>
            </div>

            <div className="mb-6 max-h-[400px] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
              {interviewConversation.map((exchange, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-2 rounded-lg bg-blue-100 p-3">
                    <p className="font-medium text-blue-800">Interviewer:</p>
                    <p className="text-gray-800">{exchange.AI}</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="font-medium text-green-800">Your Response:</p>
                    <textarea
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                      rows={3}
                      value={exchange.CANDIDATE}
                      onChange={(e) => {
                        const updatedConversation = [...interviewConversation];
                        updatedConversation[index] = {
                          ...updatedConversation[index],
                          CANDIDATE: e.target.value,
                        };
                        setInterviewConversation(updatedConversation);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
                onClick={() =>
                  makeFeedback({
                    interviewType: interviewOption?.interviewType!,
                    duration: handleInterviewDuration(startAt!, endAt!),
                    conversation: interviewConversation,
                    numberOfQuestions: questions.length,
                  })
                }
              >
                {isPending ? 'Submitting...' : 'Submit Interview for Feedback'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {isShowSuccessModal && (
        <Modal>
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl bg-white p-8 text-center shadow-lg">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Interview Submitted!</h2>

            <p className="text-gray-600">
              Your interview responses have been successfully submitted. We'll notify you when the
              results are available.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                onClick={() => navigate('/dashboard', { replace: true })}
              >
                Close
              </button>
              <button
                className="rounded-md border border-blue-600 bg-white px-6 py-2 font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
                onClick={() => navigate('/interview', { replace: true })}
              >
                Start New Interview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InterviewPage;
