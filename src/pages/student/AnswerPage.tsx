import { useEffect, useRef } from 'react';
import AppHeader from '../../layouts/AppHeader';
import Answer from '@/components/student/answer/Index';
import interviewStore from '@/stores/student/interview-store';

const IS_DEVELOPMENT = import.meta.env.MODE === 'development';

export default function AnswerPage() {
  const clearInterviewStore = interviewStore((state) => state.clearInterviewStore);
  const isMounted = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (IS_DEVELOPMENT) {
        handleDevelopmentCleanup();
      } else {
        handleProductionCleanup();
      }
    };
  }, []);

  const handleDevelopmentCleanup = () => {
    if (isMounted.current) {
      clearInterviewStore();
    }
    isMounted.current = true;
  };

  const handleProductionCleanup = () => {
    clearInterviewStore();
  };

  return (
    <div className="flex flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="p-4 py-2">
        <Answer />
      </div>
    </div>
  );
}
