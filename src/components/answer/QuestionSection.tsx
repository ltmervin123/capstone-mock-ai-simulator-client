import { useState } from 'react';

type QuestionSectionProps = {
  questions: string[];
};

export default function QuestionSection({ questions }: QuestionSectionProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-sm font-black">
        Questions {questionIndex + 1} of {questions.length}
      </h2>
      <p className="text-center text-xl font-bold">{questions[questionIndex]}</p>
    </div>
  );
}
