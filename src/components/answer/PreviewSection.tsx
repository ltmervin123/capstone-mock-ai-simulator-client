import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex h-80 w-full flex-col items-center justify-center rounded-lg bg-gray-900 p-6">
      <div className="relative mb-2">
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white">
          <span className="text-lg font-bold">{name}</span>
        </div>
        <div
          className={`absolute inset-[-8px] rounded-full transition-all ${
            isSpeaking
              ? 'animate-pulse-border border-[8px] border-green-400 shadow-[0_0_15px_5px_rgba(74,222,128,0.5)]'
              : 'border-[8px] border-green-600'
          }`}
        ></div>
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
  const navigate = useNavigate();
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
    <div className="w-full max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{interviewType}</h2>
        <button
          className="rounded bg-red-400 px-8 py-2 text-white hover:bg-red-500"
          onClick={() => navigate('/interview')}
        >
          Exit
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Preview name={interviewerName} role="Interviewer" isSpeaking={interviewerSpeaking} />
        <Preview name={intervieweeName} role="You" isSpeaking={intervieweeSpeaking} />
      </div>
    </div>
  );
}
