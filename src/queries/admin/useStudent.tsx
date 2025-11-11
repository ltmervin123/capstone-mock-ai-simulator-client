import { User } from '@/types/auth/auth-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as StudentService from '@/services/admin/student-service';
import { AcceptedStudent, PendingStudent } from '@/types/admin/student-type';
export const useGetPendingStudents = (
  user: User,
  filterOptions: Record<string, string | undefined>
) => {
  return useQuery<PendingStudent[], Error>({
    queryKey: ['pending-students', user, filterOptions],
    queryFn: () => StudentService.getPendingStudents(filterOptions),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useGetAcceptedStudents = (user: User, filterOptions: Record<string, string | undefined>) => {
  return useQuery<AcceptedStudent[], Error>({
    queryKey: ['accepted-students', user, filterOptions],
    queryFn: () => StudentService.getAcceptedStudents(filterOptions),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

type ResolveStudentApplicationParams = {
  id: string;
  action: 'ACCEPT' | 'REJECT';
};

type MutationOptions = {
  onError?: () => void;
  onSuccess?: () => void;
};

export const useResolveStudentApplication = (options: MutationOptions) => {
  const { onError, onSuccess } = options;
  const queryClient = useQueryClient();
  return useMutation<void, Error, ResolveStudentApplicationParams>({
    mutationFn: ({ id, action }) => StudentService.resolveStudentApplication(id, action),
    onError,
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-students'] });
      queryClient.invalidateQueries({ queryKey: ['accepted-students'] });
    },
  });
};
