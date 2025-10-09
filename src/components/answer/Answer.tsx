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

const InterviewPage = () => {
  const {
    questions,
    questionIndex,
    setQuestionIndex,
    currentQuestion,
    setCurrentQuestion,
    questionHistory,
    setQuestionHistory,
  } = useQuestion();
  const connected = socketStore((state) => state.connected);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { AIIntroductionMessage, isGreeting, setIsGreeting } = useGreeting();
  const [aiResponse, setAiResponse] = useState('');
  const {
    isInterviewActive,
    isCameraOn,
    videoRef,
    stopCamera,
    toggleCamera,
    setIsInterviewActive,
    isRecording,
    setIsRecording,
    startRecording,
    stopRecording,
    finalAnswer,
    realTimeTranscription,
    isUserSpeaking,
  } = useRecord();
  const { isPlaying: isAISpeaking, isLoading: isSpeakingLoading, handleSpeak } = useSpeak();
  const interviewOption = interviewStore((state) => state.interviewOption);

  useEffect(() => {
    if (currentQuestion) {
      setAiResponse(currentQuestion);
    }
  }, [currentQuestion]);

  const nextQuestion = () => {
    setAiResponse(currentQuestion);

    if (isGreeting) {
      setIsGreeting(false);
      return;
    }

    if (currentQuestion) {
      const newHistoryItem = {
        id: Date.now(),
        question: currentQuestion,
        userResponse: finalAnswer,
        timestamp: new Date().toLocaleTimeString(),
      };
      setQuestionHistory((prev) => [...prev, newHistoryItem]);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const startInterview = () => {
    setIsInterviewActive(true);

    if (isGreeting) {
      setAiResponse(AIIntroductionMessage);
      return;
    }
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
    </div>
  );
};

export default InterviewPage;
