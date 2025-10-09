import { type SpeakParams as SpeakParamsType } from '@/hooks/answer/useSpeak';
import { IntervieweeOption } from '@/types/interview/interview-option-type';
import { useEffect, useRef } from 'react';

type AIResponseProps = {
  aiResponse: string;
  selectedVoice: IntervieweeOption;
  handleSpeak: (data: SpeakParamsType) => Promise<void>;
};

export default function AIResponseComponent({
  aiResponse,
  selectedVoice,
  handleSpeak,
}: AIResponseProps) {
  const processedResponse = useRef('');

  useEffect(() => {
    const speakFunction = async () => {
      if (aiResponse && aiResponse !== processedResponse.current) {
        processedResponse.current = aiResponse;
        await handleSpeak({ text: aiResponse, selectedVoice });
      }
    };
    speakFunction();
  }, [aiResponse, handleSpeak, selectedVoice]);

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
