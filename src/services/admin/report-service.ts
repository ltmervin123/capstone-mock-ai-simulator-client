import {
  InterviewAdminReportDocument,
  InterviewFilterParams,
  InterviewPreview,
} from '@/types/admin/report-type';
import axiosClient from '../../utils/axios';

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/admin`;

export async function getInterviews(
  filterOptions: InterviewFilterParams
): Promise<InterviewPreview[]> {
  const URL = `${BASE_URL}/interviews`;
  const response = await axiosClient.get(URL, { params: filterOptions });

  return response.data.interviews;
}

export async function getInterview(interviewId: string): Promise<InterviewAdminReportDocument> {
  const URL = `${BASE_URL}/interview/${interviewId}`;
  const response = await axiosClient.get(URL);

  return response.data.interview;
}
