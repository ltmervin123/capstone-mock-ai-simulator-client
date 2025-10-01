import { Video } from 'lucide-react';

type PreviewSectionProps = {
  isCameraOn: boolean;
  isInterviewActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
};

function CandidateVideo({ isCameraOn, isInterviewActive, videoRef }: PreviewSectionProps) {
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
    </div>
  );
}

function AIInterviewer({ isInterviewActive }: { isInterviewActive: boolean }) {
  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl border-4 bg-slate-900 shadow-2xl transition-all duration-300 ${isInterviewActive ? 'animate-borderPulse border-green-500' : ''}`}
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
}: PreviewSectionProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      <CandidateVideo
        isCameraOn={isCameraOn}
        isInterviewActive={isInterviewActive}
        videoRef={videoRef}
      />

      <AIInterviewer isInterviewActive={isInterviewActive} />
    </div>
  );
}
