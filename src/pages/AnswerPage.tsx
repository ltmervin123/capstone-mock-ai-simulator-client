import { useEffect, useRef } from 'react';
import AppHeader from '../layouts/AppHeader';
import Answer from '@/components/answer/Answer';
import interviewStore from '@/stores/interview-store';

export default function AnswerPage() {
  const clearInterviewStore = interviewStore((state) => state.clearInterviewStore);
  const isMounted = useRef(false);

  useEffect(() => {
    return () => {
      if (isMounted.current) {
        clearInterviewStore();
      }
      isMounted.current = true;
    };
  }, []);

  return (
    <div className="flex flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="p-4 py-2">
        <Answer />
      </div>
    </div>
  );
}
