import { DashboardStatsType } from '@/types/admin/dashboard-stat-type';
import axiosClient from '../../utils/axios';
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/api/v1/admin`;

export async function getDashboardStat(): Promise<DashboardStatsType> {
  const URL = `${BASE_URL}/dashboard-stats`;
  const response = await axiosClient.get(URL);
  return response.data.stats;
}
