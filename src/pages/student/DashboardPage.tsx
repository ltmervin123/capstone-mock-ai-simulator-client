import AppHeader from '../../layouts/AppHeader';
import AppSidebar from '../../layouts/AppSidebar';
import Dashboard from '../../components/student/dashboard/Dashboard';
import Navigation from '@/components/student/navigation/Navigation';

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar navItems={<Navigation />} />
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
