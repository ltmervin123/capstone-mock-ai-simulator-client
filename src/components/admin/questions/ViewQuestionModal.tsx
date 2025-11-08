import Modal from '@/layouts/Modal';
import { X } from 'lucide-react';
import { useGetBehavioralCategory } from '@/queries/admin/useQuestion';
import authStore from '@/stores/auth-store';
import Spinner from '@/components/ui/spinner';
type ViewQuestionModalProps = {
  onClose: () => void;
  categoryId: string;
};

export default function ViewQuestionModal({ onClose, categoryId }: ViewQuestionModalProps) {
  const user = authStore((state) => state.user);

  const {
    data: questionData = null,
    isPending,
    isError,
  } = useGetBehavioralCategory(user!, categoryId);

  return (
    <Modal>
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="border-b border-gray-200 px-4 py-4 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">View Questions</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-4">
          {isPending && <Spinner type="fullscreen" height="h-20" width="w-20" />}
          {isError && <p className="text-center text-red-500">An error while fetching questions</p>}
          {questionData && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Category</h4>
                <p className="mt-1 text-base font-semibold text-gray-600">
                  {questionData!.category}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700">Description</h4>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {questionData!.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700">Questions</h4>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-gray-600">
                  {questionData!.questions.map((question, index) => (
                    <li key={index} className="leading-relaxed">
                      {question}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end rounded-b-lg border-t border-gray-200 bg-gray-50 px-4 py-4 md:px-6 md:py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
