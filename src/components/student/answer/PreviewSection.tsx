import { Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import interviewStore from '@/stores/student/interview-store';

type PreviewSectionProps = {
  isRecording: boolean;
  isCameraOn: boolean;
  isInterviewActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  isAISpeaking?: boolean;
  isUserSpeaking?: boolean;
  realTimeTranscription: string;
  stopRecording: () => void;
  nextQuestion: () => void;
};

function CandidateVideo({
  isCameraOn,
  isInterviewActive,
  videoRef,
  isRecording,
  isUserSpeaking,
  realTimeTranscription,
  stopRecording,
  nextQuestion,
}: PreviewSectionProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isRecording) {
      setElapsedTime(0);
      return;
    }

    interval = setInterval(() => {
      setElapsedTime((prevTime) => {
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    if (elapsedTime >= 180 && isRecording) {
      stopRecording();
      setElapsedTime(0);
      nextQuestion();
    }
  }, [elapsedTime, stopRecording, nextQuestion]);

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
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 sm:mb-4 sm:h-20 sm:w-20 md:h-32 md:w-32">
              <Video className="h-6 w-6 text-slate-400 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </div>
            <p className="text-xs text-slate-400 sm:text-sm md:text-base">
              {isInterviewActive ? 'Camera Off' : 'Camera Ready'}
            </p>
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-2 rounded-lg bg-blue-900/80 px-2 py-1 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5">
        <span className="text-xs font-medium text-white sm:text-sm">You</span>
      </div>
      {isInterviewActive && (
        <div className="absolute right-2 top-2 sm:right-4 sm:top-4">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 sm:h-3 sm:w-3"></div>
        </div>
      )}

      {/* Recording Timer Indicator */}
      {isRecording && (
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-red-500/40 px-1.5 py-0.5 backdrop-blur-sm sm:right-4 sm:top-4 sm:gap-1.5 sm:px-2 sm:py-1">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white sm:h-2 sm:w-2"></div>
          <span className="text-[8px] font-bold text-white opacity-80 sm:text-[10px]">
            {formatTime(elapsedTime)}
            <span className="ml-0.5 sm:ml-1">/ 03:00</span>
          </span>
        </div>
      )}
      {/* Real-time Transcription Display */}
      {realTimeTranscription && (
        <div className="absolute bottom-10 left-1/2 w-11/12 -translate-x-1/2 rounded-md bg-black/60 px-2 py-1 text-center backdrop-blur-sm sm:bottom-12 sm:px-4 sm:py-2">
          <p className="text-xs italic text-white sm:text-sm">{realTimeTranscription}</p>
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
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 sm:mb-4 sm:h-20 sm:w-20 md:h-32 md:w-32">
            <span className="text-2xl text-slate-400 sm:text-4xl md:text-6xl">
              {interviewOption?.selectedInterviewee.charAt(0)}
            </span>
          </div>
          <p className="text-xs text-slate-400 sm:text-sm md:text-base">
            {interviewOption?.selectedInterviewee}
          </p>
        </div>
      </div>
      <div className="absolute bottom-2 left-2 rounded-lg bg-blue-900/80 px-2 py-1 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5">
        <span className="text-xs font-medium text-white sm:text-sm">AI Interviewer</span>
      </div>
    </div>
  );
}

export default function PreviewSection({
  isCameraOn,
  isInterviewActive,
  videoRef,
  isRecording,
  isAISpeaking,
  isUserSpeaking,
  realTimeTranscription,
  stopRecording,
  nextQuestion,
}: PreviewSectionProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      <CandidateVideo
        isCameraOn={isCameraOn}
        isInterviewActive={isInterviewActive}
        videoRef={videoRef}
        isRecording={isRecording}
        isUserSpeaking={isUserSpeaking}
        realTimeTranscription={realTimeTranscription}
        stopRecording={stopRecording}
        nextQuestion={nextQuestion}
      />

      <AIInterviewer isAISpeaking={isAISpeaking!} />
    </div>
  );
}
