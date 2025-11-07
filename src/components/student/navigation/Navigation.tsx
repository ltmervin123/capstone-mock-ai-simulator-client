import DashboardSvg from '@/assets/svg-components/DashboardSvg';
import HistorySvg from '@/assets/svg-components/HistorySvg';
import InterviewSvg from '@/assets/svg-components/InterviewSvg';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/shared/useMobile';
import { useGetUnViewedInterviewCount } from '@/queries/student/useNotification';
import authStore from '@/stores/auth-store';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const isMobile = useIsMobile();
  const user = authStore((state) => state.user);
  const { data: unViewedInterviewCount = 0 } = useGetUnViewedInterviewCount(user!);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (unViewedInterviewCount > 0) {
      queryClient.invalidateQueries({ queryKey: ['user-dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['interview-history'] });
    }
  }, [unViewedInterviewCount]);

  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <>
      {isMobile && (
        <li>
          <Button asChild variant="ghost" className={`w-full justify-start`}>
            <Link to="/user/dashboard" className="flex items-center gap-2">
              <span
                className={`font-inter text-3xl font-bold text-gray-500 md:text-5xl lg:text-5xl`}
              >
                PrepWise
              </span>
            </Link>
          </Button>
        </li>
      )}
      <li>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/user/dashboard') ? 'bg-green-200' : ''}`}
        >
          <Link to="/user/dashboard" className="flex items-center gap-2">
            <DashboardSvg isActive={isLinkActive('/user/dashboard')} />
            <span
              className={`text-lg ${isLinkActive('/user/dashboard') ? 'text-green-500' : 'text-gray-500'}`}
            >
              Dashboard
            </span>
          </Link>
        </Button>
      </li>
      <li>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/user/interview') ? 'bg-green-200' : ''}`}
        >
          <Link to="/user/interview" className="flex items-center gap-2">
            <InterviewSvg isActive={isLinkActive('/user/interview')} />
            <span
              className={`text-lg ${isLinkActive('/interview') ? 'text-green-500' : 'text-gray-500'}`}
            >
              New Interview
            </span>
          </Link>
        </Button>
      </li>
      <li>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/user/history') ? 'bg-green-200' : ''}`}
        >
          <Link to="/user/history" className="flex items-center gap-2">
            <HistorySvg isActive={isLinkActive('/history')} />
            <span
              className={`text-lg ${isLinkActive('/user/history') ? 'text-green-500' : 'text-gray-500'}`}
            >
              Interview History
            </span>
            {unViewedInterviewCount > 0 && (
              <span className="absolute left-52 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                <span>{unViewedInterviewCount}</span>
              </span>
            )}
          </Link>
        </Button>
      </li>
    </>
  );
}
