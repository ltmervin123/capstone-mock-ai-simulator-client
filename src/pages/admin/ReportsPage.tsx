import AppHeader from '../../layouts/AppHeader';
import AppSidebar from '../../layouts/AppSidebar';
import Navigation from '@/components/admin/navigations/Navigation';
import Index from '@/components/admin/reports';
export default function ReportsPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar navItems={<Navigation />} />
        </div>

        <div className="flex-1 overflow-x-auto p-4">
          <Index />
        </div>
      </div>
    </div>
  );
}
