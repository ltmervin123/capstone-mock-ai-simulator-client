import { Link, useLocation } from 'react-router-dom';
import DashboardSvg from '../assets/svg-components/DashboardSvg';
import InterviewSvg from '../assets/svg-components/InterviewSvg';
import HistorySvg from '../assets/svg-components/HistorySvg';
import LogoutSvg from '../assets/svg-components/LogoutSvg';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { useIsMobile } from '../hooks/shared/useMobile';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import useSignout from '@/hooks/sign-out/useSignout';
import Spinner from '@/components/ui/spinner';

export default function AppSidebar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { isLoading, handleSignout } = useSignout();
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
                    <Link to="/dashboard" className="flex items-center gap-2">
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
                  className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/dashboard') ? 'bg-green-200' : ''}`}
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <DashboardSvg isActive={isLinkActive('/dashboard')} />
                    <span
                      className={`text-lg ${isLinkActive('/dashboard') ? 'text-green-500' : 'text-gray-500'}`}
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
                  <Link to="/interview" className="flex items-center gap-2">
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
                  className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/history') ? 'bg-green-200' : ''}`}
                >
                  <Link to="/history" className="flex items-center gap-2">
                    <HistorySvg isActive={isLinkActive('/history')} />
                    <span
                      className={`text-lg ${isLinkActive('/history') ? 'text-green-500' : 'text-gray-500'}`}
                    >
                      Interview History
                    </span>
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
