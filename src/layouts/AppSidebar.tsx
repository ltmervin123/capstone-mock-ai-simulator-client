import { Link } from 'react-router-dom';
import Modal from './Modal';
import LogoutSvg from '../assets/svg-components/LogoutSvg';
import SettingSvg from '../assets/svg-components/SettingSvg';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { useIsMobile } from '../hooks/shared/useMobile';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import useSignout from '@/hooks/auth/useSignout';
import Spinner from '@/components/ui/spinner';
import SettingsModal from '@/components/ui/settings-modal';
import authStore from '@/stores/public/auth-store';
import { JSX, useState } from 'react';

type AppSidebarProps = { navItems: JSX.Element };

export default function AppSidebar({ navItems }: AppSidebarProps) {
  const isMobile = useIsMobile();
  const { isLoading, handleSignout } = useSignout();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const user = authStore((state) => state.user);

  return (
    <SidebarProvider>
      {isMobile && (
        <div className="fixed left-2 top-28 z-50 rounded-full bg-green-700 shadow-md">
          <SidebarTrigger className="h-10 w-10 rounded-full hover:bg-green-600" />
        </div>
      )}
      <Sidebar className="h-screen border-none pt-24" variant="sidebar" side="left">
        <SidebarContent className="flex h-full flex-col bg-green-100">
          <nav className="flex-1 p-4">
            <ul className="space-y-2">{navItems}</ul>
          </nav>
          <div className="mt-auto">
            <Separator />
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-green-200 disabled:cursor-not-allowed"
                onClick={() => setIsSettingOpen(true)}
                disabled={isLoading}
              >
                <div className="flex items-center gap-2">
                  <SettingSvg />
                  <span className="text-lg text-gray-500">Settings</span>
                </div>
              </Button>
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
      {isSettingOpen && (
        <Modal>
          <SettingsModal onClose={() => setIsSettingOpen(false)} currentEmail={user?.email!} />
        </Modal>
      )}
    </SidebarProvider>
  );
}
