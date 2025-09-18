import { useEffect, useState } from 'react';

const TIPS = [
  'Speak clearly and confidently.',
  'Maintain eye contact with the interviewer.',
  'Take a moment to think before answering.',
  'Keep your answers concise and relevant.',
  'Use examples to illustrate your points.',
  'Stay positive and enthusiastic.',
  'Prepare questions to ask the interviewer.',
  'Practice common interview questions beforehand.',
  'Dress appropriately for the interview setting.',
  'Follow up with a thank-you note after the interview.',
];

export default function TipSection() {
  const [tip, setTips] = useState<string>(TIPS[0]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTips(TIPS[Math.floor(Math.random() * TIPS.length)]);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(toggleInterval);
  }, []);
  return (
    <div className="flex w-full flex-row items-center gap-4">
      <h2 className="text-lg font-bold">Tips: </h2>
      <p
        className={`text-sm text-gray-700 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {tip}
      </p>
    </div>
  );
}
