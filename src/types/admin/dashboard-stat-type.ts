import { Programs } from './report-type';

export type TopInterviewPerformers = {
  student: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
  averageScore: number;
  program: Programs;
  totalInterviews: number;
  rank: number;
};

export type DashboardStatsType = {
  totalVerifiedStudents: number;
  monthlyNewStudents: number;
  totalPendingStudents: number;
  dailyNewPendingStudents: number;
  studentsCountsByProgram: Record<string, number>;
  authenticatedStudents: number;
  topInterviewPerformers: TopInterviewPerformers[];
};
