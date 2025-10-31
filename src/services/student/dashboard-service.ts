import { DashboardStats } from '@/types/student/interview-option-type';
import axiosClient from '../../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/interview`;

export async function getDashboardStats(): Promise<DashboardStats> {
  const URL = `${BASE_URL}/dashboard-stats`;
  const response = await axiosClient.get(URL);
  return response.data.dashboardStats;
}
