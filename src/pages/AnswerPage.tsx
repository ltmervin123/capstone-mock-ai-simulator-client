import AppHeader from '../layouts/AppHeader';
import Answer from '@/components/answer/Answer';
export default function AnswerPage() {
  return (
    <div className="flex flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="p-4 py-2">
        <Answer />
      </div>
    </div>
  );
}
