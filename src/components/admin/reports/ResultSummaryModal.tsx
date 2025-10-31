import { Printer, X } from 'lucide-react';
import Modal from '@/layouts/Modal';

type InterviewResult = {
  _id: string;
  studentName: string;
  interviewType: string;
  duration: string;
  numberOfQuestions: number;
  scores: {
    grammar: number;
    experience: number;
    skills: number;
    relevance: number;
    fillerCount: number;
    totalScore: number;
  };
  feedbacks: {
    question: string;
    answer: string;
    areaOfImprovement: string;
    answerFeedback: string;
    _id: string;
  }[];
  createdAt: string;
};

type Props = {
  onClose: () => void;
};

export default function ResultSummaryModal({ onClose }: Props) {
  const data: InterviewResult = {
    _id: '68fa209b5c311beedc95a729',
    studentName: 'Alvincent F. Sangco',
    interviewType: 'Basic',
    duration: '5m 43s',
    numberOfQuestions: 5,
    scores: {
      grammar: 45,
      experience: 55,
      skills: 50,
      relevance: 65,
      fillerCount: 9,
      totalScore: 51,
    },
    feedbacks: [
      {
        question: 'Can you tell me about yourself?',
        answer:
          ' Yeah, sure. Um, my name is Alvin I am 21 years old. And I am a software engineer.',
        areaOfImprovement: 'Incomplete sentence structure and minimal professional details',
        answerFeedback:
          'Expand your introduction to include your educational background, current role, and a brief summary of your professional journey to provide a more comprehensive self-introduction',
        _id: '68fa209b5c311beedc95a72a',
      },
      {
        question:
          'What inspired you to pursue a career in software engineering at such a young age?',
        answer: ' curiosity, and it turns passion. At as time pass.',
        areaOfImprovement: 'Incomplete thought expression and grammatical errors',
        answerFeedback:
          'Structure your response with complete sentences explaining how your curiosity developed into passion, perhaps with a timeline or specific turning point',
        _id: '68fa209b5c311beedc95a72b',
      },
      {
        question:
          'Can you share a specific moment or project that really sparked your passion for software engineering?',
        answer:
          " Yeah, it is. Um, this system That I currently build right now it's called Uh, interview simulation system.",
        areaOfImprovement: 'Lack of specific details about the project',
        answerFeedback:
          'Provide specific details about your interview simulation system including its purpose, key features, and the technologies you used to develop it',
        _id: '68fa209b5c311beedc95a72c',
      },
      {
        question:
          'What motivated you to develop an interview simulation system, and what challenges did you encounter during its creation?',
        answer:
          ' Um, I encounter a lot of challenge. While developing the systems include the system architecture. What? Um stack should I use or technology and many more?',
        areaOfImprovement: 'Vague description of challenges without technical specifics',
        answerFeedback:
          "Mention 2-3 specific technical challenges you faced with concrete examples (e.g., 'I struggled with implementing real-time feedback, which I solved by using WebSockets')",
        _id: '68fa209b5c311beedc95a72d',
      },
      {
        question:
          'How did you navigate through the technical challenges of selecting the right stack and architecture for your interview simulation system?',
        answer: ' By just searching and asking fellow. Um, engineers.',
        areaOfImprovement: 'Insufficient elaboration on problem-solving approach',
        answerFeedback:
          'Describe your research process in more detail and mention specific resources you consulted or particular advice that helped you overcome the technical obstacles',
        _id: '68fa209b5c311beedc95a72e',
      },
    ],
    createdAt: '2025-10-23T12:33:31.696Z',
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-700';
    if (score >= 50) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <Modal>
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-lg print:max-h-none print:min-h-[297mm] print:w-[210mm] print:max-w-none print:rounded-none print:bg-white print:p-0 print:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6 print:border-b-2 print:border-black print:bg-white print:px-12 print:py-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 print:text-black">
              Interview Report
            </h2>
            <p className="mt-2 text-sm text-gray-500 print:text-black">
              {formatDate(data.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="rounded border border-gray-300 bg-white p-2 transition hover:bg-gray-100"
              title="Print/Download PDF"
            >
              <Printer className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={onClose}
              className="rounded border border-gray-300 bg-white p-2 transition hover:bg-gray-100"
              title="Close"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 print:overflow-visible print:px-12 print:py-8">
          {/* Student Info */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500 print:text-black">Student Name</p>
                <p className="font-medium text-gray-900 print:text-black">{data.studentName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 print:text-black">Interview Type</p>
                <p className="font-medium text-gray-900 print:text-black">{data.interviewType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 print:text-black">Duration</p>
                <p className="font-medium text-gray-900 print:text-black">{data.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 print:text-black">Questions</p>
                <p className="font-medium text-gray-900 print:text-black">
                  {data.numberOfQuestions}
                </p>
              </div>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-3 print:grid-cols-6 print:gap-2">
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Grammar</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(data.scores.grammar)} print:text-base`}
                >
                  {data.scores.grammar}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Experience</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(data.scores.experience)} print:text-base`}
                >
                  {data.scores.experience}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Skills</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(data.scores.skills)} print:text-base`}
                >
                  {data.scores.skills}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Relevance</p>
                <p
                  className={`text-xl font-semibold ${getScoreColor(data.scores.relevance)} print:text-base`}
                >
                  {data.scores.relevance}
                </p>
              </div>
              <div className="rounded border border-gray-200 bg-white p-3 text-center print:p-2">
                <p className="text-xs text-gray-500 print:text-[10px]">Fillers</p>
                <p className="text-xl font-semibold text-gray-700 print:text-base">
                  {data.scores.fillerCount}
                </p>
              </div>
              <div className="rounded border border-gray-400 bg-white p-3 text-center print:p-2">
                <p className="text-xs font-bold text-gray-700 print:text-[10px]">TOTAL</p>
                <p
                  className={`text-xl font-bold ${getScoreColor(data.scores.totalScore)} print:text-base`}
                >
                  {data.scores.totalScore}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-gray-900 print:text-black">
                Assessment Details
              </h3>
            </div>
            <div className="space-y-6 print:space-y-3">
              {data.feedbacks.map((feedback, index) => (
                <div
                  key={feedback._id}
                  className="rounded border border-gray-200 bg-white print:break-inside-avoid print:rounded print:border print:bg-white"
                >
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 print:px-3 print:py-1.5">
                    <p className="text-sm font-semibold text-gray-800 print:text-xs">
                      <span className="mr-2 inline-block h-6 w-6 rounded-full bg-gray-200 text-center leading-6 text-gray-700 print:h-5 print:w-5 print:text-[10px] print:leading-5">
                        {index + 1}
                      </span>
                      {feedback.question}
                    </p>
                  </div>
                  <div className="space-y-2 p-4 print:space-y-1.5 print:p-3">
                    <div>
                      <p className="mb-1 text-xs font-medium text-gray-500 print:text-[10px]">
                        Response:
                      </p>
                      <p className="text-sm text-gray-800 print:text-[11px]">{feedback.answer}</p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="mb-0.5 text-xs font-medium text-gray-500 print:text-[10px]">
                        Area for Improvement:
                      </p>
                      <p className="text-sm text-gray-700 print:text-[11px]">
                        {feedback.areaOfImprovement}
                      </p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="mb-0.5 text-xs font-medium text-gray-500 print:text-[10px]">
                        Recommendation:
                      </p>
                      <p className="text-sm text-gray-700 print:text-[11px]">
                        {feedback.answerFeedback}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
