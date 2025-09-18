import AppHeader from '../layouts/AppHeader';
import Answer from '@/components/answer/Answer';
export default function AnswerPage() {
  return (
    <div className="flex flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="h-full w-full p-10">
        <Answer />
      </div>
    </div>
  );
}
