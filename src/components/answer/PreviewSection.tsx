import { Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import interviewStore from '@/stores/interview-store';

type PreviewSectionProps = {
  isRecording: boolean;
  isCameraOn: boolean;
  isInterviewActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  isAISpeaking?: boolean;
  isUserSpeaking?: boolean;
  realTimeTranscription: string;
  stopRecording: () => void;
};

function CandidateVideo({
  isCameraOn,
  isInterviewActive,
  videoRef,
  isRecording,
  setIsRecording,
  isUserSpeaking,
  realTimeTranscription,
  stopRecording,
}: PreviewSectionProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isRecording) {
      setElapsedTime(0);
      return;
    }

    if (elapsedTime >= 180 && isRecording) {
      stopRecording();
      setIsRecording(false);
      setElapsedTime(0);
      return;
    }

    interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl bg-slate-900 shadow-2xl transition-all duration-300 ${isUserSpeaking ? 'animate-borderPulse border-4 border-green-400' : ''}`}
    >
      {isCameraOn && isInterviewActive ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full scale-x-[-1] transform object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 md:h-32 md:w-32">
              <Video className="h-20 w-20 text-slate-400 md:h-12 md:w-12" />
            </div>
            <p className="text-sm text-slate-400 md:text-base">
              {isInterviewActive ? 'Camera Off' : 'Camera Ready'}
            </p>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 rounded-lg bg-blue-900/80 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-sm font-medium text-white">You</span>
      </div>
      {isInterviewActive && (
        <div className="absolute right-4 top-4">
          <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
        </div>
      )}

      {/* Recording Timer Indicator */}
      {isRecording && (
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-md bg-red-500/40 px-2 py-1 backdrop-blur-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
          <span className="text-[10px] font-bold text-white opacity-80">
            {formatTime(elapsedTime)}
            <span className="ml-1">/ 03:00</span>
          </span>
        </div>
      )}
      {/* Real-time Transcription Display */}
      {realTimeTranscription && (
        <div className="absolute bottom-12 left-1/2 w-11/12 -translate-x-1/2 rounded-md bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
          <p className="text-sm italic text-white">{realTimeTranscription}</p>
        </div>
      )}
    </div>
  );
}

function AIInterviewer({ isAISpeaking }: { isAISpeaking: boolean }) {
  const interviewOption = interviewStore((state) => state.interviewOption);
  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl bg-slate-900 shadow-2xl transition-all duration-300 ${isAISpeaking ? 'animate-borderPulse border-4' : ''}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 md:h-32 md:w-32">
            <span className="text-4xl text-slate-400 md:text-6xl">
              {interviewOption?.selectedInterviewee.charAt(0)}
            </span>
          </div>
          <p className="text-sm text-slate-400 md:text-base">
            {interviewOption?.selectedInterviewee}
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-lg bg-blue-900/80 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-sm font-medium text-white">AI Interviewer</span>
      </div>
    </div>
  );
}

export default function PreviewSection({
  isCameraOn,
  isInterviewActive,
  videoRef,
  isRecording,
  setIsRecording,
  isAISpeaking,
  isUserSpeaking,
  realTimeTranscription,
  stopRecording,
}: PreviewSectionProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      <CandidateVideo
        isCameraOn={isCameraOn}
        isInterviewActive={isInterviewActive}
        videoRef={videoRef}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isUserSpeaking={isUserSpeaking}
        realTimeTranscription={realTimeTranscription}
        stopRecording={stopRecording}
      />

      <AIInterviewer isAISpeaking={isAISpeaking!} />
    </div>
  );
}
