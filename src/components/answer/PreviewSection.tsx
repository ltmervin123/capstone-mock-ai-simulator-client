import { Video, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

type PreviewSectionProps = {
  isRecording: boolean;
  isCameraOn: boolean;
  isInterviewActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
};

function CandidateVideo({
  isCameraOn,
  isInterviewActive,
  videoRef,
  isRecording,
  setIsRecording,
}: PreviewSectionProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    //Stop recording after 3 minutes
    if (elapsedTime >= 180 && isRecording) {
      setIsRecording(false);
    }

    if (isRecording) {
      // Start timer when recording begins
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Reset timer when recording stops
      setElapsedTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Format seconds into MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900 shadow-2xl">
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
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 md:h-24 md:w-24">
              <Video className="h-10 w-10 text-slate-400 md:h-12 md:w-12" />
            </div>
            <p className="text-sm text-slate-400 md:text-base">
              {isInterviewActive ? 'Camera Off' : 'Camera Ready'}
            </p>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 rounded-lg bg-slate-900/80 px-3 py-1.5 backdrop-blur-sm">
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
    </div>
  );
}

function AIInterviewer({ isInterviewActive }: { isInterviewActive: boolean }) {
  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl border-4 bg-slate-900 shadow-2xl transition-all duration-300 ${true ? 'animate-borderPulse border-green-500' : ''}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 md:h-32 md:w-32">
            <span className="text-4xl text-white md:text-6xl">S</span>
          </div>
          <p className="text-base font-semibold text-white md:text-lg">Steve</p>
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
}: PreviewSectionProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      <CandidateVideo
        isCameraOn={isCameraOn}
        isInterviewActive={isInterviewActive}
        videoRef={videoRef}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
      />

      <AIInterviewer isInterviewActive={isInterviewActive} />
    </div>
  );
}
