type BarProps = {
  label: string;
  score: number;
};

type InterviewScoresProps = {
  scores: {
    grammar: number;
    skills: number;
    experience: number;
    relevance: number;
    totalScore: number;
    fillerCount: number;
  };
};

function Bar({ label, score }: BarProps) {
  const total = 100;
  const percentage = (score / total) * 100;
  const color: Record<'grammar' | 'skills' | 'experience' | 'relevance', string> = {
    grammar: 'bg-green-500',
    skills: 'bg-blue-500',
    experience: 'bg-purple-500',
    relevance: 'bg-orange-500',
  };

  const key = label.toLowerCase() as keyof typeof color;

  return (
    <div className="grid grid-cols-1 items-center md:grid">
      <h1 className="w-20 text-sm font-medium">{label}</h1>
      <div className="flex flex-1 items-center">
        <div className="h-4 flex-1 rounded-full bg-gray-200">
          <div
            className={`${color[key]} h-4 rounded-full`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="ml-2 w-12 text-sm text-gray-600">
          {score}/{total}
        </span>
      </div>
    </div>
  );
}

export default function InterviewScores({ scores }: InterviewScoresProps) {
  return (
    <div className="w-full rounded bg-white p-4">
      <h1 className="mb-4 font-bold">Scores</h1>
      <div className="grid gap-6 md:grid md:grid-cols-3">
        <div className="grid grid-cols-1">
          <Bar label="Grammar" score={scores.grammar} />
          <Bar label="Skills" score={scores.skills} />
        </div>

        <div className="grid grid-cols-1">
          <Bar label="Experience" score={scores.experience} />
          <Bar label="Relevance" score={scores.relevance} />
        </div>
        <div className="grid grid-cols-1 place-items-center">
          <div className="mb-2 text-center">
            <div className="text-sm font-medium">Filler Count</div>
            <div className="text-lg font-bold text-red-500">{scores.fillerCount}</div>
          </div>

          <div className="relative grid h-20 w-20 place-items-center">
            <svg className="h-20 w-20" viewBox="0 0 36 36">
              <path
                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
              />
              <path
                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray={`${scores.totalScore}, 100`}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{scores.totalScore}</div>
                <p className="text-xs text-gray-500">Overall</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
