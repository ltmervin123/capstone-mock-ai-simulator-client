import { useState } from 'react';

const AIIntroductionMessage =
  "Hello! Alvin, I'm your AI interviewer today. Let's begin with our first question.";
export default function useGreeting() {
  const [isGreeting, setIsGreeting] = useState(true);

  return { isGreeting, setIsGreeting, AIIntroductionMessage };
}
