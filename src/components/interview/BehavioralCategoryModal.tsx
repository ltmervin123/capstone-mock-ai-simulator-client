import { X } from 'lucide-react';
import { useGetBehavioralCategory } from '@/queries/useBehavioralQuestion';
import interviewStore from '@/stores/interview-store';

export interface BehavioralCategoryProps {
  isOpen: boolean;
  selectedOption: string;
  onClose: () => void;
  handleStart: () => void;
}

function BehavioralCategory({
  isOpen,
  onClose,
  selectedOption,
  handleStart,
}: BehavioralCategoryProps) {
  const { data: categories = [], isLoading, isError } = useGetBehavioralCategory();
  const setInterviewOption = interviewStore((state) => state.setInterviewOption);

  if (!isOpen) return null;

  const handleOnSelectBehavioral = (selectedCategory: string) => {
    setInterviewOption({
      interviewType: 'Behavioral',
      category: selectedCategory,
      selectedInterviewee: selectedOption as 'Alice' | 'Steve',
    });
    handleStart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between border-b border-gray-200 p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg
              className="h-6 w-6 flex-shrink-0 sm:h-5 sm:w-5 md:h-6 md:w-6"
              viewBox="0 0 18 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2984 13.49L13.4478 10.6394L11.2552 9.73353C11.9853 8.69533 12.3764 7.45672 12.375 6.1875C12.375 2.77569 9.59931 0 6.1875 0C2.77569 0 0 2.77569 0 6.1875C0 9.59931 2.77569 12.375 6.1875 12.375C7.46776 12.3765 8.7166 11.9786 9.76004 11.2367L10.6636 13.4235L13.5141 16.2742C13.6969 16.457 13.9139 16.6021 14.1528 16.701C14.3916 16.8 14.6476 16.8509 14.9062 16.8509C15.1647 16.8509 15.4207 16.8 15.6596 16.7011C15.8985 16.6021 16.1155 16.4571 16.2983 16.2743C16.4812 16.0915 16.6262 15.8745 16.7251 15.6356C16.8241 15.3967 16.875 15.1407 16.875 14.8822C16.875 14.6236 16.8241 14.3676 16.7252 14.1287C16.6263 13.8899 16.4813 13.6728 16.2984 13.49ZM1.125 6.1875C1.125 3.39609 3.39609 1.125 6.1875 1.125C8.97891 1.125 11.25 3.39609 11.25 6.1875C11.25 8.97891 8.97891 11.25 6.1875 11.25C3.39609 11.25 1.125 8.97891 1.125 6.1875ZM15.5029 15.4787C15.3445 15.6367 15.1299 15.7254 14.9062 15.7254C14.6826 15.7254 14.468 15.6367 14.3096 15.4787L11.6176 12.7867L10.7776 10.7535L12.8109 11.5935L15.503 14.2855C15.6609 14.4439 15.7496 14.6584 15.7496 14.8821C15.7496 15.1058 15.6609 15.3204 15.5029 15.4787Z"
                fill="black"
              />
            </svg>

            <h2 className="truncate text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl">
              Select Categories
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 sm:p-2"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Categories List - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {isLoading && <p>Loading categories...</p>}
            {isError && (
              <p className="text-red-500">Error loading categories. Please try again later.</p>
            )}
            {categories.length === 0 && <p>No categories found.</p>}
            {categories.map((question) => (
              <div
                key={question._id}
                // onClick={() => handleCategorySelect(question._id)}
                className="cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-green-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="mb-2 font-semibold text-gray-900">{question.category}</h3>
                    <p className="text-sm text-gray-600">{question.description}</p>
                  </div>
                  <button
                    className="ml-4 flex-shrink-0 rounded bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOnSelectBehavioral(question._id);
                    }}
                  >
                    START
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BehavioralCategory;
