import Interview from '@/components/student/interview/Interview';
import AppHeader from '../../layouts/AppHeader';
import AppSidebar from '../../layouts/UserAppSidebar';

export default function InterviewPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar />
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Interview />
        </div>
      </div>
    </div>
  );
}
