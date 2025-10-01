type AIResponseProps = {
  aiResponse: string;
};

export default function AIResponse({ aiResponse }: AIResponseProps) {
  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-600">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        AI Interviewee
      </h3>
      <p className="text-base leading-relaxed text-slate-700">{aiResponse}</p>
    </div>
  );
}
