import { useState } from 'react';
import interviewStore from '@/stores/student/interview-store';
import { useBasicInterviewFollowUpQuestions } from '@/queries/student/useInterview';
import { useGetBehavioralQuestion } from '@/queries/student/useBehavioralQuestion';
import { InterviewConversation } from '@/types/student/interview-option-type';

const BASIC_INTERVIEW_FIRST_QUESTIONS = 'Can you tell me about yourself?';

export type QuestionHistoryType = {
  id: number;
  question: string;
  userResponse: string;
  timestamp: string;
};

export default function useQuestion() {
  const interviewOption = interviewStore((state) => state.interviewOption);
  const setEndAt = interviewStore((state) => state.setEndAt);
  const setAiResponse = interviewStore((state) => state.setAiResponse);
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[questionIndex]);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistoryType[]>([]);
  const [isInterviewEnd, setIsInterviewEnd] = useState(false);
  const { mutate: fetchFollowUpQuestions, isPending: isGeneratingQuestionFallowUpQuestion } =
    useBasicInterviewFollowUpQuestions();
  const questionId =
    interviewOption?.interviewType === 'Behavioral' ? interviewOption.category : '';
  const expertQuestions =
    interviewOption?.interviewType === 'Expert' ? interviewOption.questions : [];
  const { data: questionData } = useGetBehavioralQuestion(questionId);

  const handleBasicInterviewQuestions = () => {
    if (questionIndex === 0) {
      setQuestions([BASIC_INTERVIEW_FIRST_QUESTIONS, '', '', '', '']);
      setAiResponse(BASIC_INTERVIEW_FIRST_QUESTIONS);
      setCurrentQuestion(BASIC_INTERVIEW_FIRST_QUESTIONS);
    }
  };

  const handleBehavioralInterviewQuestions = () => {
    if (questionIndex === 0) {
      setQuestions(questionData!.questions!);
      setAiResponse(questionData!.questions![0]);
      setCurrentQuestion(questionData!.questions![0]);
    }
  };

  const handleExpertInterviewQuestions = () => {
    if (questionIndex === 0) {
      setQuestions(expertQuestions);
      setAiResponse(expertQuestions[0]);
      setCurrentQuestion(expertQuestions[0]);
    }
  };

  const handleBasicInterviewFollowUpQuestions = (updatedConversation: InterviewConversation) => {
    if (questionIndex < questions.length - 1) {
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
      handleInterviewEnd();
    }
  };

  const handleInterviewNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setAiResponse(questions[nextIndex]);
    } else {
      handleInterviewEnd();
    }
  };

  const handleInterviewEnd = () => {
    setEndAt(new Date());
    setIsInterviewEnd(true);
  };

  const handleNextQuestion = (updatedConversation: InterviewConversation) => {
    if (interviewOption?.interviewType === 'Basic') {
      handleBasicInterviewFollowUpQuestions(updatedConversation);
      return;
    }

    if (
      interviewOption?.interviewType === 'Behavioral' ||
      interviewOption?.interviewType === 'Expert'
    ) {
      handleInterviewNextQuestion();
      return;
    }
  };

  const makeQuestions = () => {
    if (interviewOption?.interviewType === 'Basic') {
      handleBasicInterviewQuestions();
      return;
    }

    if (interviewOption?.interviewType === 'Behavioral') {
      handleBehavioralInterviewQuestions();
      return;
    }

    if (interviewOption?.interviewType === 'Expert') {
      handleExpertInterviewQuestions();
      return;
    }
  };

  const isGeneratingQuestion = isGeneratingQuestionFallowUpQuestion;

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
    setIsInterviewEnd,
  };
}
