import HistoryHeaderSection from './HistoryHeaderSection';
import HistoryTableSection from './HistoryTableSection';

export default function History() {
  return (
    <div className="flex h-screen flex-col gap-4">
      <HistoryHeaderSection />
      <HistoryTableSection />
    </div>
  );
}
