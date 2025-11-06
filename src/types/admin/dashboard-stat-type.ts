export type DashboardStatsType = {
  totalVerifiedStudents: number;
  monthlyNewStudents: number;
  totalPendingStudents: number;
  dailyNewPendingStudents: number;
  studentsCountsByProgram: Record<string, number>;
  authenticatedStudents: number;
};
