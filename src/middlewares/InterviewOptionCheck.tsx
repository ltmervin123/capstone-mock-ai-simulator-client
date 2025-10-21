import { Navigate, Outlet } from 'react-router-dom';
import interviewStore from '@/stores/interview-store';
export default function InterviewOptionCheck() {
  const interviewOption = interviewStore((state) => state.interviewOption);

  if (!interviewOption) {
    return <Navigate to="/interview" replace />;
  }

  return <Outlet />;
}
