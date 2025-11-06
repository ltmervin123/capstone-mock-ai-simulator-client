import Modal from '@/layouts/Modal';
import { X, Trash2 } from 'lucide-react';

type DeleteQuestionModalProps = {
  onClose: () => void;
  category?: string;
};

export default function DeleteQuestionModal({ onClose, category }: DeleteQuestionModalProps) {
  const mockQuestion = {
    _id: '68f45b7fd035d16f0f189af5',
    category: 'Teamwork and Collaboration',
    description:
      'Questions focused on assessing ability to work effectively with others, contribute to team goals, and handle team dynamics - crucial skills for any entry-level position.',
  };
  return (
    <Modal>
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b border-gray-200 px-4 py-4 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Delete Question Category</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-4 py-4 md:px-6 md:py-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <Trash2 size={20} className="text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Confirm Deletion</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Are you sure you want to delete the category{' '}
                  <strong>"{mockQuestion.category}"</strong>? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-4 py-4 md:flex-row md:px-6 md:py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onClose()}
            className="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 font-semibold text-white transition-all hover:from-red-600 hover:to-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
