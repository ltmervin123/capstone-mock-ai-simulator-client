import { User } from '@/types/auth/auth-type';
import { useQuery } from '@tanstack/react-query';
import * as ReportService from '@/services/admin/report-service';
import {
  InterviewAdminReportDocument,
  InterviewFilterParams,
  InterviewPreview,
} from '@/types/admin/report-type';
export const useGetInterviews = (user: User, filterOptions: InterviewFilterParams) => {
  return useQuery<InterviewPreview[], Error>({
    queryKey: ['report-interviews', user, filterOptions],
    queryFn: () => ReportService.getInterviews(filterOptions),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: 'always',
  });
};

export const useGetInterview = (user: User, interviewId: string) => {
  return useQuery<InterviewAdminReportDocument, Error>({
    queryKey: ['report-interview', user, interviewId],
    queryFn: () => ReportService.getInterview(interviewId),
    enabled: !!user && !!interviewId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: 'always',
  });
};
