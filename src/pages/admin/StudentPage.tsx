import Student from '@/components/admin/student/Student';
import AppHeader from '../../layouts/AppHeader';
import AppSidebar from '../../layouts/AppSidebar';
import Navigation from '@/components/admin/navigation/Navigation';
export default function UsersPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar navItems={<Navigation />} />
        </div>

        <div className="flex-1 overflow-x-auto p-4">
          <Student />
        </div>
      </div>
    </div>
  );
}
