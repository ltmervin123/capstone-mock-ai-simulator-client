import { useState, useEffect } from 'react';
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

const InterviewPage = () => {
  const user = authStore((state) => state.user);
  const connected = socketStore((state) => state.connected);
  const interviewOption = interviewStore((state) => state.interviewOption);
  const interviewConversation = interviewStore((state) => state.interviewConversation);
  const setInterviewConversation = interviewStore((state) => state.setInterviewConversation);
  const aiResponse = interviewStore((state) => state.aiResponse);
  const setAiResponse = interviewStore((state) => state.setAiResponse);
  const { mutate: sendGreeting, isPending: isSendingGreetingResponse } = useGreetingResponse();
  const { isPlaying: isAISpeaking, isLoading: isSpeakingLoading, handleSpeak } = useSpeak();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [hasNoAnswer, setHasNoAnswer] = useState(false);
  const { AIIntroductionMessage, isGreeting, setIsGreeting } = useGreeting();
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
    handleNextQuestion,
  } = useQuestion();

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
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setCurrentQuestion('');
    stopCamera();
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
    </div>
  );
};

export default InterviewPage;
