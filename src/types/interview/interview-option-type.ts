export type IntervieweeOption = 'Alice' | 'Steve';
type interviewType = 'Basic' | 'Behavioral' | 'Expert';

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
};

export type InterviewOption =
  | BasicInterviewOption
  | BehavioralInterviewOption
  | ExpertInterviewOption;

export type InterviewState = {
  interviewOption: InterviewOption | null;
  interviewConversation: InterviewConversation;
  aiResponse: string;
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
