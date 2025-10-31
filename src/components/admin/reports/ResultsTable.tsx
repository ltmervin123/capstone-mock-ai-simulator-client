import { useState } from 'react';
import { Eye, Printer, FileSpreadsheet } from 'lucide-react';
import ResultSummaryModal from './ResultSummaryModal';

type Result = {
  id: string;
  student: string;
  course: string;
  interviewType: string;
  date: string;
  status: string;
  score: number;
};

const mockResults: Result[] = [
  {
    id: '1',
    student: 'Juan Dela Cruz',
    course: 'BSIT',
    interviewType: 'Basic',
    date: '2024-06-01',
    status: 'Passed',
    score: 85,
  },
  {
    id: '2',
    student: 'Maria Santos',
    course: 'BSBA',
    interviewType: 'Behavioral',
    date: '2024-06-02',
    status: 'Failed',
    score: 60,
  },
  {
    id: '3',
    student: 'Pedro Reyes',
    course: 'BSED',
    interviewType: 'Expert',
    date: '2024-06-03',
    status: 'Pending',
    score: 0,
  },
  {
    id: '1',
    student: 'Juan Dela Cruz',
    course: 'BSIT',
    interviewType: 'Basic',
    date: '2024-06-01',
    status: 'Passed',
    score: 85,
  },
  {
    id: '2',
    student: 'Maria Santos',
    course: 'BSBA',
    interviewType: 'Behavioral',
    date: '2024-06-02',
    status: 'Failed',
    score: 60,
  },
  {
    id: '3',
    student: 'Pedro Reyes',
    course: 'BSED',
    interviewType: 'Expert',
    date: '2024-06-03',
    status: 'Pending',
    score: 0,
  },
  {
    id: '1',
    student: 'Juan Dela Cruz',
    course: 'BSIT',
    interviewType: 'Basic',
    date: '2024-06-01',
    status: 'Passed',
    score: 85,
  },
  {
    id: '2',
    student: 'Maria Santos',
    course: 'BSBA',
    interviewType: 'Behavioral',
    date: '2024-06-02',
    status: 'Failed',
    score: 60,
  },
  {
    id: '3',
    student: 'Pedro Reyes',
    course: 'BSED',
    interviewType: 'Expert',
    date: '2024-06-03',
    status: 'Pending',
    score: 0,
  },

  {
    id: '1',
    student: 'Juan Dela Cruz',
    course: 'BSIT',
    interviewType: 'Basic',
    date: '2024-06-01',
    status: 'Passed',
    score: 85,
  },
  {
    id: '2',
    student: 'Maria Santos',
    course: 'BSBA',
    interviewType: 'Behavioral',
    date: '2024-06-02',
    status: 'Failed',
    score: 60,
  },
  {
    id: '3',
    student: 'Pedro Reyes',
    course: 'BSED',
    interviewType: 'Expert',
    date: '2024-06-03',
    status: 'Pending',
    score: 0,
  },
];

export default function ResultsTable() {
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const handleExport = (type: 'pdf' | 'excel') => {};

  return (
    <div className="rounded bg-white">
      <div className="mb-2 flex justify-end gap-2">
        <button
          className="flex items-center gap-1 rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
          onClick={() => handleExport('pdf')}
        >
          <Printer size={16} /> Print / Export PDF
        </button>
        <button
          className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          onClick={() => handleExport('excel')}
        >
          <FileSpreadsheet size={16} /> Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Student</th>
                <th className="px-3 py-2 text-left">Course</th>
                <th className="px-3 py-2 text-left">Interview Type</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Score</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {mockResults.map((result) => (
                <tr key={result.id} className="border-b">
                  <td className="px-3 py-2 text-left">{result.student}</td>
                  <td className="px-3 py-2 text-left">{result.course}</td>
                  <td className="px-3 py-2 text-left">{result.interviewType}</td>
                  <td className="px-3 py-2 text-left">{result.date}</td>
                  <td className="px-3 py-2 text-left">{result.score}</td>
                  <td className="px-3 py-2 text-left">
                    <button
                      className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                      onClick={() => setSelectedResult(result)}
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedResult && <ResultSummaryModal onClose={() => setSelectedResult(null)} />}
    </div>
  );
}
