import { useState } from 'react';
import interviewStore from '@/stores/interview-store';
import { useBasicInterviewFollowUpQuestions } from '@/queries/useInterview';
import { InterviewConversation } from '@/types/interview/interview-option-type';
const BASIC_INTERVIEW_FIRST_QUESTIONS = 'Can you tell me about yourself?';

export type QuestionHistoryType = {
  id: number;
  question: string;
  userResponse: string;
  timestamp: string;
};

export default function useQuestion() {
  const interviewOption = interviewStore((state) => state.interviewOption);
  const setAiResponse = interviewStore((state) => state.setAiResponse);
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[questionIndex]);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistoryType[]>([]);
  const [isInterviewEnd, setIsInterviewEnd] = useState(false);
  const { mutate: fetchFollowUpQuestions, isPending: isGeneratingQuestion } =
    useBasicInterviewFollowUpQuestions();

  const handleBasicInterviewQuestions = () => {
    if (interviewOption?.interviewType === 'Basic' && questionIndex === 0) {
      setQuestions([BASIC_INTERVIEW_FIRST_QUESTIONS, '', '', '', '']);
      setAiResponse(BASIC_INTERVIEW_FIRST_QUESTIONS);
      setCurrentQuestion(BASIC_INTERVIEW_FIRST_QUESTIONS);
    }
  };

  const handleBasicInterviewFollowUpQuestions = (updatedConversation: InterviewConversation) => {
    if (interviewOption?.interviewType === 'Basic' && questionIndex < questions.length - 1) {
      fetchFollowUpQuestions(
        {
          interviewType: interviewOption?.interviewType!,
          conversation: updatedConversation,
        },
        {
          onSuccess: (data) => {
            setQuestions((prevQuestions) => {
              const newQuestions = [...prevQuestions];
              newQuestions[questionIndex + 1] = data;
              return newQuestions;
            });

            setCurrentQuestion(data);
            setAiResponse(data);

            setQuestionIndex(questionIndex + 1);
          },
        }
      );
    } else {
      setAiResponse(
        'Thank you for your time. This concludes our interview. You will be notified for the feedbacks.'
      );
      setIsInterviewEnd(true);
    }
  };

  const handleChangeQuestion = () => {
    if (questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex]);
      setAiResponse(questions[questionIndex]);
    }
  };

  const handleNextQuestion = (updatedConversation: InterviewConversation) => {
    handleBasicInterviewFollowUpQuestions(updatedConversation);
  };

  const makeQuestions = () => {
    handleBasicInterviewQuestions();
  };

  return {
    questions,
    setQuestions,
    questionIndex,
    setQuestionIndex,
    currentQuestion,
    setCurrentQuestion,
    questionHistory,
    setQuestionHistory,
    makeQuestions,
    isGeneratingQuestion,
    handleNextQuestion,
    isInterviewEnd,
  };
}
