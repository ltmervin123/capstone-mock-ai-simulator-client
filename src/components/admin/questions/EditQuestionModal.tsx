import Modal from '@/layouts/Modal';
import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

type EditQuestionModalProps = {
  onClose: () => void;
};
export default function EditQuestionModal({ onClose }: EditQuestionModalProps) {
  const mockQuestion = {
    _id: '68f45b7fd035d16f0f189af5',
    category: 'Teamwork and Collaboration',
    description:
      'Questions focused on assessing ability to work effectively with others, contribute to team goals, and handle team dynamics - crucial skills for any entry-level position.',
    questionCount: 8,
    numberOfQuestionToGenerate: 5,
    questions: [
      'Describe a time when you had to work closely with a team to achieve a common goal.',
      'Can you provide an example of a conflict you faced within a team and how you resolved it?',
      'How do you handle situations where team members have differing opinions or approaches?',
      'Tell me about a successful project you were part of and your role in its success.',
      'How do you ensure effective communication within a team setting.',
      'Describe a time when you had to work closely with a team to achieve a common goal.',
      'Can you provide an example of a conflict you faced within a team and how you resolved it?',
      'How do you handle situations where team members have differing opinions or approaches?',
      'Tell me about a successful project you were part of and your role in its success.',
      'How do you ensure effective communication within a team setting.',
      'Describe a time when you had to work closely with a team to achieve a common goal.',
      'Can you provide an example of a conflict you faced within a team and how you resolved it?',
      'How do you handle situations where team members have differing opinions or approaches?',
      'Tell me about a successful project you were part of and your role in its success.',
      'How do you ensure effective communication within a team setting.',
    ],
  };

  const [category, setCategory] = useState(mockQuestion.category);
  const [description, setDescription] = useState(mockQuestion.description);
  const [questions, setQuestions] = useState(mockQuestion.questions);

  const handleSave = () => {
    console.log('Saving:', { category, description, questions });
  };

  return (
    <Modal>
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="border-b border-gray-200 px-4 py-4 md:px-6 md:py-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit Question</h3>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
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
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <button
                      onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                     className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
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

        <div
          className="flex flex-col gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-4 py-4 md:flex-row md:px-6 md:py-4"
          onClick={() => onClose()}
        >
          <button className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition-all hover:from-green-600 hover:to-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
