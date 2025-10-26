import AppHeader from '../layouts/AppHeader';
import AppSidebar from '../layouts/UserAppSidebar';
import History from '../components/history/History';
export default function HistoryPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <AppSidebar />
        </div>

        <main className="flex-1 p-4">
          <History />
        </main>
      </div>
    </div>
  );
}
