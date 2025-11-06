import { useEffect, useState, useCallback } from 'react';
import { IntervieweeOption } from '@/types/student/interview-option-type';
import useFetch from '@/hooks/shared/useFetch';
import { textToSpeech } from '@/services/student/interview-service';

export type SpeakParams = {
  text: string;
  selectedVoice: IntervieweeOption;
};

type SpeakResponse = {
  success: boolean;
  audioContent: string;
  message: string;
};

export default function useSpeak() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isLoading, data, error, handleFetch, reset } = useFetch<SpeakResponse, SpeakParams>();

  const handleSpeak = useCallback(
    async (params: SpeakParams) => {
      reset();
      await handleFetch(textToSpeech, params);
    },
    [reset, handleFetch]
  );

  //Play the audio data in the background when data is available
  useEffect(() => {
    if (!data?.audioContent) return;

    const audio = new Audio(`data:audio/wav;base64,${data?.audioContent}`);
    setIsPlaying(true);

    audio.play().catch((err) => {
      console.error('Autoplay blocked by browser:', err);
    });

    audio.onended = () => setIsPlaying(false);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [data]);

  return { isPlaying, isLoading, handleSpeak };
}
