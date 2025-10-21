import { Printer, X } from 'lucide-react';

type InterviewDetailHeaderProps = {
  onClose: () => void;
};

export default function InterviewDetailHeader({ onClose }: InterviewDetailHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Interview Summary</h1>
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          title="Print Interview Summary"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
        <button
          onClick={onClose}
          className="text-2xl font-bold text-gray-400 hover:text-gray-600"
          title="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
