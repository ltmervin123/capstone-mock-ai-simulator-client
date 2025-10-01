import { useState } from 'react';
import QuestionSection from './QuestionSection';
import PreviewSection from './PreviewSection';
import HistoryModal from './HistoryModal';
import AIResponse from './AIResponse';
import ControlPanel from './ControlPanel';
import GettingStarted from './GettingStarted';
import useRecord from '../../hooks/answer/useRecord';
import useGreeting from '../../hooks/answer/useGreeting';

const MOCK_QUESTIONS = [
  'Can you tell me about yourself?',
  'What are your strengths and weaknesses?',
  'Why do you want to work here?',
  'Describe a challenging situation you faced and how you handled it.',
];

const InterviewPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { AIIntroductionMessage, isGreeting, setIsGreeting } = useGreeting();
  const {
    isInterviewActive,
    isMuted,
    isCameraOn,
    videoRef,
    streamRef,
    startCamera,
    stopCamera,
    toggleMute,
    toggleCamera,
    setIsInterviewActive,
    isRecording,
    setIsRecording,
  } = useRecord();

  const nextQuestion = () => {
    // Save current question and simulated response to history
    if (currentQuestion) {
      const newHistoryItem = {
        id: Date.now(),
        question: currentQuestion,
        userResponse:
          "This is a simulated user response. In a real implementation, this would be the user's actual spoken or typed answer.",
        timestamp: new Date().toLocaleTimeString(),
      };
      // setQuestionHistory((prev) => [...prev, newHistoryItem]);
    }

    // Move to next question
    const currentIndex = MOCK_QUESTIONS.indexOf(currentQuestion);
    if (currentIndex < MOCK_QUESTIONS.length - 1) {
      const nextQ = MOCK_QUESTIONS[currentIndex + 1];
      setCurrentQuestion(nextQ);
      simulateAIResponse("Great answer! Let's move on to the next question.");
    } else {
      simulateAIResponse('Thank you! That completes our interview session.');
    }
  };

  const simulateAIResponse = (text: string) => {
    // setAiResponse('');
    // let index = 0;
    // const interval = setInterval(() => {
    //   if (index < text.length) {
    //     setAiResponse((prev) => prev + text[index]);
    //     index++;
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 30);
  };

  const startInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestion(MOCK_QUESTIONS[0]);
    setQuestionHistory([]);
    simulateAIResponse(
      "Hello! I'm your AI interviewer today. Let's begin with our first question."
    );
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setCurrentQuestion('');
    setAiResponse('');
    stopCamera();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Question Panel */}
        {/* {isInterviewActive && currentQuestion && (
          <QuestionSection
            currentQuestion={currentQuestion}
            questionHistory={questionHistory.length}
            numberOfQuestions={MOCK_QUESTIONS.length}
            questionIndex={MOCK_QUESTIONS.indexOf(currentQuestion)}
            setIsHistoryModalOpen={setIsHistoryModalOpen}
          />
        )} */}

        {/* Video Grid */}
        <PreviewSection
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          isCameraOn={isCameraOn}
          isInterviewActive={isInterviewActive}
          videoRef={videoRef as React.RefObject<HTMLVideoElement>}
        />

        {/* AI Response Area */}
        {isInterviewActive && <AIResponse aiResponse={AIIntroductionMessage} />}

        {/* Control Panel */}
        <ControlPanel
          isInterviewActive={isInterviewActive}
          isGreeting={isGreeting}
          isMuted={isMuted}
          isCameraOn={isCameraOn}
          startInterview={startInterview}
          endInterview={endInterview}
          toggleMute={toggleMute}
          toggleCamera={toggleCamera}
          setIsHistoryModalOpen={setIsHistoryModalOpen}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />

        {!isInterviewActive && <GettingStarted />}

        {/* Interview History Modal */}
        {isHistoryModalOpen && (
          <HistoryModal
            questionHistory={questionHistory}
            setIsHistoryModalOpen={setIsHistoryModalOpen}
            interviewType="Basic Interview"
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
