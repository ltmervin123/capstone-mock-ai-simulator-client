import { X } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/shared/useScrollLock';

type ConversationData = {
  question: string;
  answer: string;
};

type ConversationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: ConversationData[];
};

export default function ConversationModal({ isOpen, onClose, data }: ConversationModalProps) {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Conversation</h2>
          <X className="h-6 w-6 hover:cursor-pointer" onClick={onClose} />
        </div>

        {/* Content */}
        <div className="max-h-96 space-y-4 overflow-y-auto">
          {data.length > 0 ? (
            data.map((conversation, index) => (
              <div key={index} className="space-y-3">
                {/* Question */}
                <div className="rounded-lg bg-green-50 p-2">
                  <div className="mb-1 text-xs font-medium text-green-700">Question:</div>
                  <div className="mb-2 text-sm text-green-800">{conversation.question}</div>
                  <div className="mb-1 text-xs font-medium text-blue-700">Answer:</div>
                  <div className="text-sm text-blue-800">{conversation.answer}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <div className="text-gray-500">No conversation available yet.</div>
              <div className="mt-1 text-xs text-gray-400">
                Start recording to see your conversation here.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
