import { useState, useEffect } from 'react';

type PreviewSectionProps = {
  interviewType: string;
  interviewerName: string;
  intervieweeName: string;
};

type PreviewProps = {
  name: string;
  role: string;
  isSpeaking?: boolean;
};

function Preview({ name, role, isSpeaking = false }: PreviewProps) {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center rounded-lg bg-gray-800 p-10">
      <div
        className={`h-30 w-30 flex items-center justify-center rounded-full transition-all ${
          isSpeaking
            ? 'animate-pulse-border border-[8px] border-green-400 shadow-[0_0_15px_5px_rgba(74,222,128,0.5)]'
            : 'border-[8px] border-green-600'
        }`}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
          <span className="text-lg font-bold">{name}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-white">{role}</div>
    </div>
  );
}

export default function PreviewSection({
  interviewType,
  interviewerName,
  intervieweeName,
}: PreviewSectionProps) {
  // Simulate speaking status toggling for demonstration
  const [interviewerSpeaking, setInterviewerSpeaking] = useState(false);
  const [intervieweeSpeaking, setIntervieweeSpeaking] = useState(false);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setInterviewerSpeaking((prev) => !prev);
    }, 1000);

    return () => clearInterval(toggleInterval);
  }, []);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setIntervieweeSpeaking((prev) => !prev);
    }, 500);

    return () => clearInterval(toggleInterval);
  }, []);
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800">{interviewType}</h2>
      <div className="mb-4 grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        <Preview name={interviewerName} role="Interviewer" isSpeaking={interviewerSpeaking} />
        <Preview name={intervieweeName} role="You" isSpeaking={intervieweeSpeaking} />
      </div>
    </div>
  );
}
