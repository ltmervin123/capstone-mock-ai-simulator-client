import Spinner from '@/components/ui/spinner';
import Modal from '@/layouts/Modal';
import { useGetBehavioralCategory, useUpdateBehavioralCategory } from '@/queries/admin/useQuestion';
import authStore from '@/stores/public/auth-store';
import {
  validateBehavioralQuestionData,
  ValidationErrors,
} from '@/utils/validators/handle-questions-validator';
import { Trash2, Plus } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type EditQuestionModalProps = {
  onClose: () => void;
  categoryId: string;
};
export default function EditQuestionModal({ onClose, categoryId }: EditQuestionModalProps) {
  const queryClient = useQueryClient();
  const user = authStore((state) => state.user);
  const {
    data: questionData = null,
    isPending,
    isError,
  } = useGetBehavioralCategory(user!, categoryId);
  const {
    mutate: updateCategory,
    isPending: isUpdating,
    isError: updateError,
  } = useUpdateBehavioralCategory(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['behavioral-category'] });
        queryClient.invalidateQueries({ queryKey: ['behavioral-categories'] });
        onClose();
      },
    },
    categoryId
  );

  const [category, setCategory] = useState(questionData?.category);
  const [description, setDescription] = useState(questionData?.description);
  const [questions, setQuestions] = useState(questionData?.questions);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const hasChanges =
    category !== questionData?.category ||
    description !== questionData?.description ||
    JSON.stringify(questions) !== JSON.stringify(questionData?.questions);

  useEffect(() => {
    if (questionData) {
      setCategory(questionData?.category);
      setDescription(questionData?.description);
      setQuestions(questionData?.questions);
    }
  }, [questionData]);

  const handleSave = () => {
    setValidationErrors({});

    const validationErrors = validateBehavioralQuestionData({
      category: category!,
      description: description!,
      questions: questions!,
    });

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    updateCategory({
      category: category!,
      description: description!,
      questions: questions!,
    });
  };

  const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValidationErrors = { ...validationErrors };
    if (newValidationErrors.questions) {
      setQuestions;
      const { [index]: _, ...rest } = newValidationErrors.questions;
      newValidationErrors.questions = rest;
    }
    setValidationErrors(newValidationErrors);
    const newQuestions = [...questions!];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  if (isPending) {
    return (
      <Modal>
        <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 px-4 py-4 md:px-6 md:py-4">
            <h3 className="text-lg font-semibold text-gray-900">Edit Question</h3>
          </div>

          <div className="h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-4">
            <Spinner type="fullscreen" height="h-20" width="w-20" />
          </div>
        </div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal>
        <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 px-4 py-4 md:px-6 md:py-4">
            <h3 className="text-lg font-semibold text-gray-900">Edit Question</h3>
          </div>

          <div className="h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-4">
            <p className="text-center text-red-500">An error while fetching questions</p>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal>
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="border-b border-gray-200 px-4 py-4 md:px-6 md:py-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit Question</h3>
        </div>

        <div className="h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-4">
          {questionData && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => {
                    setValidationErrors({ ...validationErrors, category: undefined });
                    setCategory(e.target.value);
                  }}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
                {validationErrors.category && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setValidationErrors({ ...validationErrors, description: undefined });
                    setDescription(e.target.value);
                  }}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Questions</label>
                <div className="space-y-2">
                  {questions?.map((q, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-2">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={q}
                            onChange={(e) => handleQuestionChange(index, e)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (questions.length <= 5) return;
                            setValidationErrors({});
                            setQuestions(questions.filter((_, i) => i !== index));
                          }}
                          className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
                          disabled={questions.length <= 5}
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                      {validationErrors.questions?.[index] && (
                        <p className="text-sm text-red-500">{validationErrors.questions[index]}</p>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setQuestions([...questions!, ''])}
                    className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                  >
                    <Plus size={20} />
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-4 py-4 md:flex-row md:px-6 md:py-4">
          <button
            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50"
            disabled={isUpdating}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition-all hover:from-green-600 hover:to-green-700 disabled:opacity-50"
            disabled={isUpdating || !hasChanges}
          >
            {isUpdating ? 'Saving changes...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
