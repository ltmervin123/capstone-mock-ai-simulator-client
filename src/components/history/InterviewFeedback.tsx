type FeedbackData = {
  question: string;
  answer: string;
  areaOfImprovement: string;
  feedback: string;
};

type ColorKeys = 'Question' | 'Answer' | 'Area of improvement' | 'Feedback';

type TextAreaProps = {
  text: string;
  label: ColorKeys;
};

function TextArea({ text, label }: TextAreaProps) {
  const color = {
    Question: 'bg-white',
    Answer: 'bg-gray-50',
    'Area of improvement': 'bg-green-50',
    Feedback: 'bg-yellow-50',
  };
  return (
    <div className="w-full">
      <h3 className="mb-2 font-medium text-gray-800">{label}</h3>
      <p className={`text-sm text-gray-700 ${color[label]} p-4`}>{text}</p>
    </div>
  );
}

export default function InterviewFeedback({
  question,
  answer,
  areaOfImprovement,
  feedback,
}: FeedbackData) {
  return (
    <div className="h-2/3 w-full rounded bg-white p-4">
      <h1 className="mb-4 font-bold">Feedback</h1>
      <div className="space-y-4">
        <TextArea text={question} label="Question" />
        <TextArea text={answer} label="Answer" />
        <TextArea text={areaOfImprovement} label="Area of improvement" />
        <TextArea text={feedback} label="Feedback" />
      </div>
    </div>
  );
}
