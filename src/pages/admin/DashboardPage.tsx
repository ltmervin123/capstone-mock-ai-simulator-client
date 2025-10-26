import AppHeader from '../../layouts/AppHeader';
import AppSidebar from '../../layouts/UserAppSidebar';

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar />
        </div>

        <div className="flex-1 overflow-auto p-4">
          <h1>Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
}
