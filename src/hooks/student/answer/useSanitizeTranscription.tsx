import { useState } from 'react';
import { sanitizedTranscription } from '@/services/student/interview-service';
export default function useSanitizeTranscription() {
  const [isSanitizing, setIsSanitizing] = useState(false);

  const handleSanitizeTranscription = async (transcription: string): Promise<string> => {
    setIsSanitizing(true);
    try {
      const sanitizedText = await sanitizedTranscription(transcription);
      return sanitizedText;
    } catch (error) {
      console.error('Error sanitizing transcription:', error);
      return transcription;
    } finally {
      setIsSanitizing(false);
    }
  };
  return { isSanitizing, sanitizeTranscription: handleSanitizeTranscription };
}
