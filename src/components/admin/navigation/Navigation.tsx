import DashboardSvg from '@/assets/svg-components/DashboardSvg';
import QuestionsSvg from '@/assets/svg-components/QuestionsSvg';
import UsersSvg from '@/assets/svg-components/UsersSvg';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/shared/useMobile';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const isMobile = useIsMobile();
  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <>
      {isMobile && (
        <li>
          <Button asChild variant="ghost" className={`w-full justify-start`}>
            <Link to="/admin/dashboard" className="flex items-center gap-2">
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
          className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/admin/dashboard') ? 'bg-green-200' : ''}`}
        >
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <DashboardSvg isActive={isLinkActive('/admin/dashboard')} />
            <span
              className={`text-lg ${isLinkActive('/admin/dashboard') ? 'text-green-500' : 'text-gray-500'}`}
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
          className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/admin/users') ? 'bg-green-200' : ''}`}
        >
          <Link to="/admin/users" className="flex items-center gap-2">
            <UsersSvg isActive={isLinkActive('/admin/users')} />
            <span
              className={`text-lg ${isLinkActive('/admin/users') ? 'text-green-500' : 'text-gray-500'}`}
            >
              Users
            </span>
          </Link>
        </Button>
      </li>
      <li>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:bg-green-200 ${isLinkActive('/admin/questions') ? 'bg-green-200' : ''}`}
        >
          <Link to="/admin/questions" className="flex items-center gap-2">
            <QuestionsSvg isActive={isLinkActive('/admin/questions')} />
            <span
              className={`text-lg ${isLinkActive('/admin/questions') ? 'text-green-500' : 'text-gray-500'}`}
            >
              Questions
            </span>
          </Link>
        </Button>
      </li>
    </>
  );
}
