import { User } from '@/types/auth/auth-type';
import { useQuery } from '@tanstack/react-query';
import * as StudentService from '@/services/admin/student-service';
import { AcceptedStudent, PendingStudent } from '@/types/admin/student-type';
export const useGetPendingStudents = (user: User) => {
  return useQuery<PendingStudent[], Error>({
    queryKey: ['pending-students', user],
    queryFn: () => StudentService.getPendingStudents(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useGetAcceptedStudents = (user: User) => {
  return useQuery<AcceptedStudent[], Error>({
    queryKey: ['accepted-students', user],
    queryFn: () => StudentService.getAcceptedStudents(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};
