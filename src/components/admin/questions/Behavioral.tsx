import { Plus } from 'lucide-react';
import { useState } from 'react';

import AddCategoryModal from './AddQuestion';
import QuestionCard from './QuestionCard';

const mockQuestions = [
  {
    _id: '68f45b7fd035d16f0f189af5',
    category: 'Teamwork and Collaboration',
    description:
      'Questions focused on assessing ability to work effectively with others, contribute to team goals, and handle team dynamics - crucial skills for any entry-level position.',
    questionCount: 8,
    numberOfQuestionToGenerate: 5,
  },
  {
    _id: '68f45bc0d035d16f0f189af6',
    category: 'Problem-Solving and Critical Thinking',
    description:
      'Questions that evaluate analytical skills, creativity in finding solutions, and ability to approach challenges methodically - essential for navigating workplace obstacles.',
    questionCount: 12,
    numberOfQuestionToGenerate: 6,
  },
  {
    _id: '68f45bd0d035d16f0f189af7',
    category: 'Leadership and Initiative',
    description:
      'Questions examining the ability to take charge, motivate others, and drive projects forward - demonstrating potential for growth and management roles.',
    questionCount: 10,
    numberOfQuestionToGenerate: 4,
  },
  {
    _id: '68f45be1d035d16f0f189af8',
    category: 'Adaptability and Resilience',
    description:
      'Questions assessing flexibility in dealing with change, ability to recover from setbacks, and maintaining effectiveness in dynamic environments.',
    questionCount: 9,
    numberOfQuestionToGenerate: 5,
  },
  {
    _id: '68f45beed035d16f0f189af9',
    category: 'Communication Skills',
    description:
      'Questions evaluating verbal and written communication abilities, active listening, and effectiveness in conveying information to different audiences.',
    questionCount: 15,
    numberOfQuestionToGenerate: 7,
  },
  {
    _id: '68f45c0dd035d16f0f189afa',
    category: 'Time Management and Organization',
    description:
      'Questions focused on prioritization skills, meeting deadlines, and efficiently managing multiple responsibilities - critical for entry-level productivity.',
    questionCount: 7,
    numberOfQuestionToGenerate: 4,
  },
  {
    _id: '68f45c17d035d16f0f189afb',
    category: 'Work Ethic and Professionalism',
    description:
      'Questions assessing dedication, reliability, accountability, and professional conduct - fundamental qualities employers seek in new hires.',
    questionCount: 11,
    numberOfQuestionToGenerate: 5,
  },
  {
    _id: '68f45c20d035d16f0f189afc',
    category: 'Conflict Resolution and Interpersonal Skills',
    description:
      'Questions examining ability to navigate disagreements, build relationships, and maintain positive interactions in challenging situations.',
    questionCount: 8,
    numberOfQuestionToGenerate: 4,
  },
  {
    _id: '68f45c2ad035d16f0f189afd',
    category: 'Learning Agility and Growth Mindset',
    description:
      'Questions measuring willingness to learn, openness to feedback, and ability to develop new skills - indicating potential for career development.',
    questionCount: 10,
    numberOfQuestionToGenerate: 5,
  },
  {
    _id: '68f45c36d035d16f0f189afe',
    category: 'Goal Setting and Achievement',
    description:
      'Questions exploring ability to set objectives, create action plans, and persist toward accomplishment - showing drive and results orientation.',
    questionCount: 9,
    numberOfQuestionToGenerate: 4,
  },
  {
    _id: '68f45c40d035d16f0f189aff',
    category: 'Customer Service and Stakeholder Management',
    description:
      "Questions assessing ability to understand and meet others' needs, handle complaints, and build positive relationships with various stakeholders.",
    questionCount: 13,
    numberOfQuestionToGenerate: 6,
  },
  {
    _id: '68f45c52d035d16f0f189b00',
    category: 'Innovation and Creativity',
    description:
      'Questions evaluating ability to think creatively, propose new ideas, and challenge conventional approaches - valuable for driving innovation.',
    questionCount: 8,
    numberOfQuestionToGenerate: 4,
  },
];

export default function Behavioral() {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  return (
    <div className="grid gap-2">
      <div className="grid md:grid-cols-2">
        <span className="font-medium text-gray-700">
          Total Categories: <span className="text-green-600">{mockQuestions.length}</span>
        </span>
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-3 font-semibold text-white hover:from-green-600 hover:to-green-700"
          onClick={() => setIsAddingCategory(true)}
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>
      <div className="grid h-[50vh] grid-cols-1 gap-2 overflow-y-auto">
        {mockQuestions.map((question) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            category={question.category}
            description={question.description}
            questionCount={question.questionCount}
            numberOfQuestionToGenerate={question.numberOfQuestionToGenerate}
          />
        ))}
      </div>
      {isAddingCategory && <AddCategoryModal onClose={() => setIsAddingCategory(false)} />}
    </div>
  );
}
