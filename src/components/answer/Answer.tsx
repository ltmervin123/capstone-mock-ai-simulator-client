import { useState } from 'react';
import AnswerSection from './AnswerSection';
import AudioControl from './AudioControl';
import ConversationModal from './ConversationModal';
import PreviewSection from './PreviewSection';
import QuestionSection from './QuestionSection';
import TipSection from './TipSection';

const MOCK_QUESTIONS = [
  'Can you tell me about yourself?',
  'What are your strengths and weaknesses?',
  'Why do you want to work here?',
  'Describe a challenging situation you faced and how you handled it.',
];

export default function Answer() {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  return (
    <div className="flex w-full flex-col gap-10">
      <PreviewSection
        interviewType={'Behavioral Interview'}
        interviewerName={'Steve'}
        intervieweeName={'AS'}
      />

      <QuestionSection questions={MOCK_QUESTIONS} />
      <AnswerSection answers={'This is a sample answer.'} />
      <AudioControl onSeeConversation={() => setIsConversationOpen(true)} />
      <TipSection />
      <ConversationModal
        isOpen={isConversationOpen}
        onClose={() => setIsConversationOpen(false)}
        data={[
          { question: 'What is your name?', answer: 'My name is John Doe.' },
          { question: 'What do you do?', answer: 'I am a software developer.' },
        ]}
      />
    </div>
  );
}
