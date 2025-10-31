import Index from '@/components/admin/questions/Index';
import AppHeader from '../../layouts/AppHeader';
import AppSidebar from '../../layouts/AppSidebar';
import Navigation from '@/components/admin/navigations/Navigation';
export default function QuestionPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar navItems={<Navigation />} />
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Index />
        </div>
      </div>
    </div>
  );
}
