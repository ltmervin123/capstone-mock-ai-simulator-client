import AppHeader from '../layouts/AppHeader';
import Answer from '@/components/answer/Answer';
export default function AnswerPage() {
  return (
    <div className="flex h-screen flex-col bg-green-50 font-inter">
      <AppHeader />

      <div className="flex h-full w-full justify-center p-10">
        <Answer />
      </div>
    </div>
  );
}
