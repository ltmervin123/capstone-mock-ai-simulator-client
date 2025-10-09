import interviewStore from '@/stores/interview-store';
import { useState } from 'react';
import authStore from '@/stores/auth-store';

export default function useGreeting() {
  const interviewOption = interviewStore((state) => state.interviewOption);
  const user = authStore((state) => state.user);

  const [isGreeting, setIsGreeting] = useState(true);
  const AIIntroductionMessage = `Hello ${user?.firstName}, I am ${interviewOption?.selectedInterviewee}. I'll be asking you ${interviewOption?.interviewType} questions today. I'm looking forward to our conversation. Let's get started!`;

  return { isGreeting, setIsGreeting, AIIntroductionMessage };
}
