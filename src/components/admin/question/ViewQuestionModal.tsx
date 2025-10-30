import Modal from '@/layouts/Modal';
import { X } from 'lucide-react';

type ViewQuestionModalProps = {
  onClose: () => void;
};

export default function ViewQuestionModal({ onClose }: ViewQuestionModalProps) {
  const mockQuestion = {
    _id: '68f45b7fd035d16f0f189af5',
    category: 'Teamwork and Collaboration',
    description:
      'Questions focused on assessing ability to work effectively with others, contribute to team goals, and handle team dynamics - crucial skills for any entry-level position.',
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
      'Describe a time when you had to work closely with a team to achieve a common goal.',
      'Can you provide an example of a conflict you faced within a team and how you resolved it?',
      'How do you handle situations where team members have differing opinions or approaches?',
      'Tell me about a successful project you were part of and your role in its success.',
      'How do you ensure effective communication within a team setting.',
    ],
  };

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

        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Category</h4>
              <p className="mt-1 text-base font-semibold text-gray-600">{mockQuestion.category}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Description</h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {mockQuestion.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Questions</h4>
              <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-gray-600">
                {mockQuestion.questions.map((question, index) => (
                  <li key={index} className="leading-relaxed">
                    {question}
                  </li>
                ))}
              </ol>
            </div>
          </div>
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
