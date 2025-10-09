import { useState, useEffect } from 'react';
const MOCK_QUESTIONS = [
  'Can you tell me about yourself?',
  'What inspired you to pursue a career in this field?',
  'What are your greatest achievements?',
  'What are your strengths and weaknesses?',
  'Why do you want to work here?',
  'Describe a challenging situation you faced and how you handled it.',
];

export type QuestionHistoryType = {
  id: number;
  question: string;
  userResponse: string;
  timestamp: string;
};

export default function useQuestion() {
  const [questions, setQuestions] = useState<string[]>(MOCK_QUESTIONS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[questionIndex]);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistoryType[]>([]);

  useEffect(() => {
    if (questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex]);
    }
  }, [questionIndex, questions]);

  return {
    questions,
    setQuestions,
    questionIndex,
    setQuestionIndex,
    currentQuestion,
    setCurrentQuestion,
    questionHistory,
    setQuestionHistory,
  };
}
