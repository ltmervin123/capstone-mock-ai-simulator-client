import Question from '@/components/admin/question/Question';
import AppHeader from '../../layouts/AppHeader';
import AppSidebar from '../../layouts/AppSidebar';
import Navigation from '@/components/admin/navigation/Navigation';
export default function QuestionPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar navItems={<Navigation />} />
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Question />
        </div>
      </div>
    </div>
  );
}
