import Modal from '@/layouts/Modal';
import { X } from 'lucide-react';
import { useState } from 'react';

type AddCategoryModalProps = {
  onClose: () => void;
};

export default function AddCategoryModal({ onClose }: AddCategoryModalProps) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfQuestionToGenerate, setNumberOfQuestionToGenerate] = useState(5);
  const [questions, setQuestions] = useState(['']);

  const handleAdd = () => {
    if (!category.trim() || !description.trim() || questions.some((q) => !q.trim())) {
      alert('Please fill in all fields.');
      return;
    }

    onClose();
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
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Teamwork and Collaboration"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
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
                onChange={(e) => setNumberOfQuestionToGenerate(parseInt(e.target.value) || 1)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the category..."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Questions</label>
              <div className="space-y-2">
                {questions.map((q, index) => (
                  <div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      placeholder={`Question ${index + 1}`}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <button
                      onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                      className="w-full rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100 sm:w-auto"
                      disabled={questions.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setQuestions([...questions, ''])}
                  className="w-full rounded-lg bg-green-50 px-4 py-2 text-green-600 hover:bg-green-100 sm:w-auto"
                >
                  Add Question
                </button>
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
            onClick={handleAdd}
            className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition-all hover:from-green-600 hover:to-green-700"
          >
            Add Category
          </button>
        </div>
      </div>
    </Modal>
  );
}
