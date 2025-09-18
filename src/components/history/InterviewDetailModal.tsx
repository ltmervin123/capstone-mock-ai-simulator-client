import { X } from 'lucide-react';
import InterviewFeedback from './InterviewFeedback';
import InterviewScores from './InterviewScores';
import InterviewSummary from './InterviewSummary';
import { useState } from 'react';
import Controller from './Controller';

const mockData = [
  {
    question: 'Can you explain the concept of closures in JavaScript?',
    answer:
      'A closure is a function that retains access to its lexical scope even when the function is executed outside that scope. This allows the function to remember the environment in which it was created.',
    areaOfImprovement: 'Provide more real-world examples of closures in action.',
    feedback:
      'Good understanding of closures, but try to elaborate more on practical applications.',
  },
  {
    question: 'What is the purpose of the "use strict" directive in JavaScript?',
    answer:
      '"use strict" is a directive that enables strict mode in JavaScript, which helps catch common coding mistakes and "unsafe" actions such as defining global variables unintentionally.',
    areaOfImprovement: 'Explain the benefits of using strict mode in larger applications.',
    feedback:
      'Good explanation of strict mode, but try to provide more context on its importance in real-world applications.',
  },
  {
    question: 'How does prototypal inheritance work in JavaScript?',
    answer:
      'Prototypal inheritance allows objects to inherit properties and methods from other objects. Each object has a prototype, and when a property is accessed, JavaScript looks up the prototype chain until it finds the property or reaches the end of the chain.',
    areaOfImprovement: 'Discuss the differences between prototypal and classical inheritance.',
    feedback:
      'Solid understanding of prototypal inheritance, but consider comparing it with other inheritance models for clarity.',
  },
];

type InterviewDetailProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function InterviewDetail({ isOpen, onClose }: InterviewDetailProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-green-50 p-4">
        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="pb-4 text-2xl font-bold text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <InterviewSummary
          type={'Basic'}
          date={'April 5, 2025'}
          duration={'20:00 minutes'}
          questions={10}
        />
        <InterviewScores />
        <InterviewFeedback
          question={mockData[currentQuestionIndex].question}
          answer={mockData[currentQuestionIndex].answer}
          areaOfImprovement={mockData[currentQuestionIndex].areaOfImprovement}
          feedback={mockData[currentQuestionIndex].feedback}
        />

        <Controller
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          data={mockData}
        />
      </div>
    </div>
  );
}
