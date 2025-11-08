import Modal from '@/layouts/Modal';
import { useState } from 'react';
import { updateBehavioralQuestionNumberToBeAnswered } from '@/queries/admin/useQuestion';
import { useQueryClient } from '@tanstack/react-query';
type ConfigModalProps = {
  category: string;
  onClose: () => void;
  initialValue: number;
  categoryId: string;
};
export default function ConfigModal({
  category,
  onClose,
  initialValue,
  categoryId,
}: ConfigModalProps) {
  const queryClient = useQueryClient();
  const { mutate: updateMaxQuestions, isPending: isUpdating } =
    updateBehavioralQuestionNumberToBeAnswered(
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['behavioral-categories'] });
          onClose();
        },
      },
      categoryId
    );
  const [maxQuestions, setMaxQuestions] = useState(initialValue);

  return (
    <Modal>
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Configure Questions</h3>
          <p className="mt-1 text-sm text-gray-600">{category}</p>
        </div>

        <div className="px-6 py-4">
          <label className="block text-sm font-medium text-gray-700">
            Maximum Questions to Display
          </label>
          <input
            type="number"
            min="5"
            value={maxQuestions}
            onChange={(e) => setMaxQuestions(parseInt(e.target.value) || 5)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <p className="mt-2 text-xs text-gray-500">
            Set how many questions from this category will be shown to users during interviews
          </p>
        </div>

        <div className="flex gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50"
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            onClick={() => updateMaxQuestions(maxQuestions)}
            className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition-all hover:from-green-600 hover:to-green-700 disabled:opacity-50"
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
