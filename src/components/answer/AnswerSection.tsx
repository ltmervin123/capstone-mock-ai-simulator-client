type AnswerSectionProps = {
  answers: string;
};

export default function AnswerSection({ answers }: AnswerSectionProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-sm font-black">Answer</h2>
      <p className="text-center text-xl">{answers}</p>
    </div>
  );
}
