import { Square, Circle, Video, VideoOff } from 'lucide-react';
type ControlPanelProps = {
  isInterviewActive: boolean;
  isCameraOn: boolean;
  isRecording: boolean;
  questions: string[];
  isSpeakingLoading: boolean;
  isAISpeaking: boolean;
  startInterview: () => void;
  endInterview: () => void;
  toggleCamera: () => void;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHistoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nextQuestion: () => void;
  startRecording: () => void;
  stopRecording: () => void;
};
export default function ControlPanel({
  isInterviewActive,
  isCameraOn,
  startInterview,
  toggleCamera,
  isRecording,
  setIsHistoryModalOpen,
  setIsRecording,
  nextQuestion,
  questions,
  isSpeakingLoading,
  isAISpeaking,
  stopRecording,
  startRecording,
}: ControlPanelProps) {
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
                setIsRecording(!isRecording);
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
              disabled={isSpeakingLoading || isAISpeaking}
            >
              {isRecording ? (
                <Square className="h-6 w-6" />
              ) : (
                <Circle className="h-6 w-6" fill="white" />
              )}
            </button>

            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-600 hover:shadow-xl"
              title="View Interview History"
            >
              {questions.length === 0 ? 'Generate Questions' : 'Interview History'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
