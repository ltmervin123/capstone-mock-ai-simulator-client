import Spinner from '@/components/ui/spinner';
import { Printer, X } from 'lucide-react';

type InterviewDetailHeaderProps = {
  onClose: () => void;
  onPrint: () => void;
  isPrinting: boolean;
};

export default function InterviewDetailHeader({
  onClose,
  onPrint,
  isPrinting,
}: InterviewDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Interview Summary</h1>
        <p className="mt-1 text-sm text-gray-500">Review your performance and feedback</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="group flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          title="Print Interview Summary"
        >
          {isPrinting ? (
            <Spinner width="h-5" height="w-5" />
          ) : (
            <>
              <Printer className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Print</span>
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          title="Close (Esc)"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
