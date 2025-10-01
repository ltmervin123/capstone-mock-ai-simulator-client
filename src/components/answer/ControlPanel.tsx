import { Mic, MicOff, Phone, PhoneOff, Video, VideoOff } from 'lucide-react';
type ControlPanelProps = {
  isInterviewActive: boolean;
  isMuted: boolean;
  isCameraOn: boolean;
  startInterview: () => void;
  endInterview: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  nextQuestion: () => void;
};
export default function ControlPanel({
  isInterviewActive,
  isMuted,
  isCameraOn,
  startInterview,
  endInterview,
  toggleMute,
  toggleCamera,
  nextQuestion,
}: ControlPanelProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {!isInterviewActive ? (
          <button
            onClick={startInterview}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl sm:w-auto"
          >
            <Phone className="h-5 w-5" />
            Start Interview
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className={`rounded-full p-4 transition-all duration-200 ${
                isMuted
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </button>

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
              onClick={endInterview}
              className="rounded-full bg-red-500 p-4 text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl"
              title="End Interview"
            >
              <PhoneOff className="h-6 w-6" />
            </button>

            <button
              onClick={nextQuestion}
              className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-600 hover:shadow-xl"
              title="Next Question"
            >
              Next Question
            </button>
          </>
        )}
      </div>

      {/* Status Indicators */}
      {isInterviewActive && (
        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}
              ></div>
              <span className="text-slate-600">Microphone: {isMuted ? 'Muted' : 'Active'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${isCameraOn ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
              <span className="text-slate-600">Camera: {isCameraOn ? 'On' : 'Off'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
