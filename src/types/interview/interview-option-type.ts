export type IntervieweeOption = 'Alice' | 'Steve';
export type interviewType = 'Basic' | 'Behavioral' | 'Expert';

type BasicInterviewOption = {
  interviewType: 'Basic';
  selectedInterviewee: IntervieweeOption;
};

type BehavioralInterviewOption = {
  interviewType: 'Behavioral';
  category: string;
  selectedInterviewee: IntervieweeOption;
};

type ExpertInterviewOption = {
  interviewType: 'Expert';
  resumeFile: File | null;
  jobTitle: string;
  selectedInterviewee: IntervieweeOption;
  questions: string[];
};

export type InterviewOption =
  | BasicInterviewOption
  | BehavioralInterviewOption
  | ExpertInterviewOption;

export type InterviewState = {
  interviewOption: InterviewOption | null;
  interviewConversation: InterviewConversation;
  aiResponse: string;
  startAt: Date | null;
  endAt: Date | null;
  setStartAt: (date: Date) => void;
  setEndAt: (date: Date) => void;
  setAiResponse: (response: string) => void;
  setInterviewOption: (option: InterviewOption) => void;
  clearInterviewOption: () => void;
  setInterviewConversation: (conversation: InterviewConversation) => void;
  clearInterviewConversation: () => void;
  clearAiResponse: () => void;
  clearInterviewStore: () => void;
};

export type GreetingParams = {
  userName: string;
  interviewerName: IntervieweeOption;
  interviewType: interviewType;
  conversation: {
    AI: string;
    CANDIDATE: string;
  };
};

export type InterviewConversation = {
  AI: string;
  CANDIDATE: string;
}[];

export type FollowUpQuestionParams = {
  interviewType: interviewType;
  conversation: InterviewConversation;
};

export type GenerateInterviewFeedbackPayload = {
  interviewType: interviewType;
  duration: string;
  numberOfQuestions: number;
  conversation: {
    AI: string;
    CANDIDATE: string;
  }[];
};

export type InterviewHistory = {
  _id: string;
  interviewType: interviewType;
  createdAt: Date;
  duration: string;
  numberOfQuestions: number;
  totalScore: number;
  isViewed: boolean;
};

export type InterviewClientDocument = {
  _id: string;
  interviewType: interviewType;
  duration: string;
  numberOfQuestions: number;
  scores: {
    grammar: number;
    experience: number;
    skills: number;
    relevance: number;
    fillerCount: number;
    totalScore: number;
  };
  feedbacks: {
    question: string;
    answer: string;
    areaOfImprovement: string;
    answerFeedback: string;
  }[];
  createdAt?: Date;
  isViewed: boolean;
};

export type ExpertInterviewPayload = {
  resume: File;
  jobTitle: string;
};

export type DashboardStats = {
  interviewsCount: number;
  averageScores: number;
  highestScores: {
    interviewType: interviewType;
    createdAt: string;
    score: number;
  };
  progressOverTime: {
    daily: {
      labels: string[];
      data: number[];
    };
    weekly: {
      labels: string[];
      data: number[];
    };
    monthly: {
      labels: string[];
      data: number[];
    };
  };
  performanceBreakDown: {
    grammar: number;
    experience: number;
    skills: number;
    relevance: number;
  };
  interviewTypeScores: {
    basic: number;
    behavioral: number;
    expert: number;
  };
};
