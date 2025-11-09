import { Plus } from 'lucide-react';
import { useState } from 'react';
import authStore from '@/stores/public/auth-store';
import AddCategoryModal from './AddQuestion';
import QuestionCard from './QuestionCard';
import { useGetBehavioralCategories } from '@/queries/admin/useQuestion';

export default function Behavioral() {
  const user = authStore((state) => state.user);
  const { data: categories = [], isPending } = useGetBehavioralCategories(user!);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  return (
    <div className="grid gap-2">
      <div className="grid md:grid-cols-2">
        <span className="font-medium text-gray-700">
          Total Categories: <span className="text-green-600">{categories.length}</span>
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
        {isPending && (
          <p className="mt-4 text-center text-gray-500">Loading behavioral categories...</p>
        )}
        {categories.length === 0 && !isPending && (
          <p className="mt-4 text-center text-gray-500">No behavioral categories found.</p>
        )}
        {categories.map((category) => (
          <QuestionCard
            key={category._id}
            _id={category._id}
            category={category.category}
            description={category.description}
            questionCount={category.questionCount}
            numberOfQuestionToGenerate={category.numberOfQuestionToGenerate}
          />
        ))}
      </div>
      {isAddingCategory && <AddCategoryModal onClose={() => setIsAddingCategory(false)} />}
    </div>
  );
}
