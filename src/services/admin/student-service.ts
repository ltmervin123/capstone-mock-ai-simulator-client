import axiosClient from '../../utils/axios';
import { PendingStudent, AcceptedStudent } from '@/types/admin/student-type';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/admin`;

export async function getPendingStudents(
  filterOptions: Record<string, string | undefined>
): Promise<PendingStudent[]> {
  const URL = `${BASE_URL}/pending-students`;
  const response = await axiosClient.get(URL, { params: filterOptions });
  return response.data.pendingStudents;
}
export async function getAcceptedStudents(
  filterOptions: Record<string, string | undefined>
): Promise<AcceptedStudent[]> {
  const URL = `${BASE_URL}/accepted-students`;
  const response = await axiosClient.get(URL, { params: filterOptions });
  return response.data.acceptedStudents;
}

export async function resolveStudentApplication(
  id: string,
  action: 'ACCEPT' | 'REJECT'
): Promise<void> {
  const URL = `${BASE_URL}/resolve-student-application`;
  await axiosClient.put(URL, { id, action });
}
