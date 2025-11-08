import Modal from '@/layouts/Modal';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { AddBehavioralQuestion } from '@/queries/admin/useQuestion';
import { useQueryClient } from '@tanstack/react-query';
import {
  validateBehavioralQuestionData,
  ValidationErrors,
} from '@/utils/validators/handle-questions-validator';
type AddCategoryModalProps = {
  onClose: () => void;
};

export default function AddCategoryModal({ onClose }: AddCategoryModalProps) {
  const queryClient = useQueryClient();
  const { mutate: addCategory, isPending } = AddBehavioralQuestion({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['behavioral-categories'] });
      onClose();
    },
  });
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [numberOfQuestionToGenerate, setNumberOfQuestionToGenerate] = useState(5);
  const [questions, setQuestions] = useState(['', '', '', '', '']);

  const handleAdd = () => {
    setValidationErrors({});

    const validationErrors = validateBehavioralQuestionData({
      category: category!,
      description: description!,
      questions: questions!,
      numberOfQuestionToGenerate: numberOfQuestionToGenerate!,
    });

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    addCategory({
      category: category!,
      description: description!,
      questions: questions!,
      numberOfQuestionToGenerate: numberOfQuestionToGenerate!,
    });
  };

  const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValidationErrors = { ...validationErrors };
    if (newValidationErrors.questions) {
      const { [index]: _, ...rest } = newValidationErrors.questions;
      newValidationErrors.questions = rest;
    }
    setValidationErrors(newValidationErrors);
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  return (
    <Modal>
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="border-b border-gray-200 px-4 py-4 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-4">
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
                placeholder="e.g., Teamwork and Collaboration"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
              {validationErrors.category && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Questions to Generate
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={numberOfQuestionToGenerate}
                onChange={(e) => {
                  setValidationErrors({
                    ...validationErrors,
                    numberOfQuestionToGenerate: undefined,
                  });
                  setNumberOfQuestionToGenerate(parseInt(e.target.value) || 5);
                }}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
              {validationErrors.numberOfQuestionToGenerate && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.numberOfQuestionToGenerate}
                </p>
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
                placeholder="Describe the category..."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Questions</label>
              <div className="space-y-2">
                {questions.map((q, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={q}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleQuestionChange(index, e)
                          }
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
                  onClick={() => setQuestions([...questions, ''])}
                  className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                >
                  <Plus size={20} />
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-4 py-4 md:flex-row md:px-6 md:py-4">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={isPending}
            className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition-all hover:from-green-600 hover:to-green-700 disabled:opacity-50"
          >
            {isPending ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
