export type IntervieweeOption = 'Alice' | 'Steve';

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
  setInterviewOption: (option: InterviewOption) => void;
  clearInterviewOption: () => void;
};
