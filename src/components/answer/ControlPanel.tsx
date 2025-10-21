import { Square, Circle, Video, VideoOff } from 'lucide-react';
type ControlPanelProps = {
  isInterviewActive: boolean;
  isCameraOn: boolean;
  isRecording: boolean;
  questions: string[];
  isSpeakingLoading: boolean;
  isAISpeaking: boolean;
  isSendingGreetingResponse: boolean;
  isGeneratingQuestion: boolean;
  isInitializing: boolean;
  hasPermissionError: boolean;
  isGreeting: boolean;
  startInterview: () => void;
  endInterview: () => void;
  toggleCamera: () => void;
  setIsHistoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nextQuestion: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  makeQuestions: () => void;
};
export default function ControlPanel({
  isInterviewActive,
  isCameraOn,
  startInterview,
  toggleCamera,
  isRecording,
  setIsHistoryModalOpen,
  nextQuestion,
  questions,
  isSpeakingLoading,
  isAISpeaking,
  stopRecording,
  startRecording,
  isSendingGreetingResponse,
  makeQuestions,
  isGreeting,
  isGeneratingQuestion,
  isInitializing,
  hasPermissionError,
}: ControlPanelProps) {
  const isNotGreeting = !isGreeting && questions.length === 0;

  if (isInitializing || hasPermissionError) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="hidden animate-pulse">
            <div className="h-14 w-48 rounded-xl bg-gray-300"></div>
          </div>

          <>
            <div className="h-14 w-14 animate-pulse rounded-full bg-gray-300"></div>

            <div className="h-14 w-14 animate-pulse rounded-full bg-gray-300"></div>

            <div className="h-12 w-40 animate-pulse rounded-full bg-gray-300"></div>
          </>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {!isInterviewActive ? (
          <button
            onClick={startInterview}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl sm:w-auto"
          >
            Start Interview
          </button>
        ) : (
          <>
            <button
              onClick={toggleCamera}
              className={`rounded-full p-4 transition-all duration-200 ${
                !isCameraOn
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isCameraOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </button>

            <button
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                  nextQuestion();
                } else {
                  startRecording();
                }
              }}
              className={`rounded-full p-4 text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 ${
                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
              title={isRecording ? 'Submit Response' : 'Record Response'}
              disabled={
                isSpeakingLoading ||
                isAISpeaking ||
                isSendingGreetingResponse ||
                isGeneratingQuestion ||
                isNotGreeting
              }
            >
              {isRecording ? (
                <Square className="h-6 w-6" />
              ) : (
                <Circle className="h-6 w-6" fill="white" />
              )}
            </button>

            <button
              onClick={() => {
                if (questions.length === 0) {
                  makeQuestions();
                } else {
                  setIsHistoryModalOpen(true);
                }
              }}
              className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-600 hover:shadow-xl disabled:opacity-50"
              disabled={
                isGeneratingQuestion || isSendingGreetingResponse || isAISpeaking || isGreeting
              }
              title={questions.length === 0 ? 'Generate Questions' : 'View Interview History'}
            >
              {questions.length === 0 ? 'Generate Questions' : 'Interview History'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
