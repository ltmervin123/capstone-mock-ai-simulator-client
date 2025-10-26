import { Link, useLocation } from 'react-router-dom';
import DashboardSvg from '../assets/svg-components/DashboardSvg';
import InterviewSvg from '../assets/svg-components/InterviewSvg';
import HistorySvg from '../assets/svg-components/HistorySvg';
import LogoutSvg from '../assets/svg-components/LogoutSvg';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { useIsMobile } from '../hooks/shared/useMobile';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { useGetUnViewedInterviewCount } from '@/queries/useNotification';
import useSignout from '@/hooks/sign-out/useSignout';
import Spinner from '@/components/ui/spinner';
import authStore from '@/stores/auth-store';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function AppSidebar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { isLoading, handleSignout } = useSignout();
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
    <SidebarProvider>
      {isMobile && (
        <div className="fixed left-2 top-28 z-50 rounded-full bg-green-700 shadow-md">
          <SidebarTrigger className="h-10 w-10" />
        </div>
      )}
      <Sidebar className="h-screen border-none pt-24" variant="sidebar" side="left">
        <SidebarContent className="flex h-full flex-col bg-green-100">
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
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
                  className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/interview') ? 'bg-green-200' : ''}`}
                >
                  <Link to="/user/interview" className="flex items-center gap-2">
                    <InterviewSvg isActive={isLinkActive('/interview')} />
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
            </ul>
          </nav>
          <div className="mt-auto">
            <Separator />
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-green-200 disabled:cursor-not-allowed"
                onClick={handleSignout}
                disabled={isLoading}
              >
                <Link to="/login" className="flex items-center gap-2">
                  <LogoutSvg />
                  {isLoading ? <Spinner /> : <span className="text-lg text-gray-500">Log out</span>}
                </Link>
              </Button>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
