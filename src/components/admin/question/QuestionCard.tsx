import { ChevronUp, ChevronDown, Eye, Edit, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfigModal from './ConfigModal';
import DeleteQuestionModal from './DeleteQuestionModal';
import EditQuestionModal from './EditQuestionModal';
import ViewQuestionModal from './ViewQuestionModal';

type QuestionCardProps = {
  _id: string;
  category: string;
  description: string;
  questionCount: number;
  numberOfQuestionToGenerate: number;
};

export default function QuestionCard({
  _id,
  category,
  description,
  questionCount,
  numberOfQuestionToGenerate,
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShowConfig, setIsShowConfig] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [maxQuestions, setMaxQuestions] = useState(numberOfQuestionToGenerate);

  const handleSaveConfig = (newMax: number) => {
    setMaxQuestions(newMax);
    console.log('Updated number of questions to generate to:', newMax);
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white transition-all">
        <div className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {questionCount} Questions
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Max: {maxQuestions} per interview
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 sm:self-start"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={18} />
                  <span className="hidden sm:inline">Less</span>
                </>
              ) : (
                <>
                  <ChevronDown size={18} />
                  <span className="hidden sm:inline">More</span>
                </>
              )}
            </button>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-relaxed text-gray-600">{description}</p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIsViewing(true)}
                  className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <Eye size={16} />
                  View Questions
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-lg bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-100"
                >
                  <Edit size={16} />
                  Edit
                </button>

                <button
                  onClick={() => setIsShowConfig(true)}
                  className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                >
                  <Settings size={16} />
                  Configure
                </button>

                <button
                  onClick={() => setIsDeleting(true)}
                  className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isShowConfig && (
        <ConfigModal
          category={category}
          onClose={() => setIsShowConfig(false)}
          onSave={handleSaveConfig}
          initialValue={maxQuestions}
        />
      )}
      {isEditing && <EditQuestionModal onClose={() => setIsEditing(false)} />}
      {isViewing && <ViewQuestionModal onClose={() => setIsViewing(false)} />}
      {isDeleting && <DeleteQuestionModal onClose={() => setIsDeleting(false)} />}
    </>
  );
}
