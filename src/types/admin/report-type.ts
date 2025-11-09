export type InterviewFilterParams = {
  program?:
    | 'Bachelor of Science in Business Administration'
    | 'Bachelor of Science in Information Technology'
    | 'Bachelor of Science in Criminology'
    | 'Bachelor of Science in Hospitality Management'
    | 'Bachelor of Science in Education'
    | 'Bachelor of Elementary Education';
  interviewType?: 'Basic' | 'Behavioral' | 'Expert';
  score?: 'HIGHEST' | 'LOWEST';
  dateFrom?: string;
  dateTo?: string;
} | null;

export type Programs =
  | 'Bachelor of Science in Business Administration'
  | 'Bachelor of Science in Information Technology'
  | 'Bachelor of Science in Criminology'
  | 'Bachelor of Science in Hospitality Management'
  | 'Bachelor of Science in Education'
  | 'Bachelor of Elementary Education';

export type InterviewTypes = 'Basic' | 'Behavioral' | 'Expert';

export type InterviewPreview = {
  _id: string;
  interviewType: InterviewTypes;
  createdAt: Date;
  program: Programs;
  studentFullName: string;
  totalScore: number;
};

export type FilterOptionState = {
  filterOptions: {
    program?: string;
    interviewType?: string;
    score?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  setFilterOptions: (option: {
    program?: string;
    type?: string;
    score?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => void;
};
