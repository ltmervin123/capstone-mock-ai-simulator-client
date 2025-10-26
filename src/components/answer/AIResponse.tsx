import { type SpeakParams as SpeakParamsType } from '@/hooks/student/answer/useSpeak';
import { IntervieweeOption } from '@/types/interview/interview-option-type';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import interviewStore from '@/stores/interview-store';

type AIResponseProps = {
  aiResponse: string;
  selectedVoice: IntervieweeOption;
  isInitializing: boolean;
  hasPermissionError: boolean;
  isInterviewEnd: boolean;
  handleSpeak: (data: SpeakParamsType) => Promise<void>;
};

export default function AIResponseComponent({
  aiResponse,
  selectedVoice,
  isInitializing,
  hasPermissionError,
  isInterviewEnd,
  handleSpeak,
}: AIResponseProps) {
  const setEndAt = interviewStore((state) => state.setEndAt);
  const processedResponse = useRef('');
  const navigate = useNavigate();

  useEffect(() => {
    const speakFunction = async () => {
      if (aiResponse && aiResponse !== processedResponse.current) {
        processedResponse.current = aiResponse;
        await handleSpeak({ text: aiResponse, selectedVoice });
        // if (isInterviewEnd) {
        //   // Execute all UI logic after speaking and interview ends
        //   // processedResponse.current = '';
        //   // navigate('/user/dashboard', { replace: true });
        //   setEndAt(new Date());
        // }
      }
    };
    speakFunction();
  }, [aiResponse]);

  if (isInitializing || hasPermissionError) {
    return (
      <div className="mb-6 animate-pulse rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-4 w-32 rounded bg-gray-300"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-600">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        {selectedVoice}
      </h3>
      <p className="text-base leading-relaxed text-slate-700">{aiResponse}</p>
    </div>
  );
}
