import { useState } from 'react';
import CustomDropdown from './FilterDropdown';
import { PROGRAM_ACRONYMS } from '@/constants/program-option';

const courses = ['All', ...Object.values(PROGRAM_ACRONYMS)];
const interviewTypes = ['All', 'Basic', 'Behavioral', 'Expert'];
const scores = ['Highest', 'Lowest'];

type Course = 'All' | 'BSIT' | 'BSBA' | 'BSED' | 'BEED';
type InterviewType = 'All' | 'Basic' | 'Behavioral' | 'Expert';
type ScoreOrder = 'All' | 'Highest' | 'Lowest';

export default function FilterBar() {
  const [course, setCourse] = useState<Course>('All');
  const [type, setType] = useState<InterviewType>('All');
  const [score, setScore] = useState<ScoreOrder>('Highest');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  return (
    <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg">
      <div className="flex min-w-[180px] flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Course</label>
        <CustomDropdown<Course> options={courses as Course[]} value={course} onChange={setCourse} />
      </div>
      <div className="flex min-w-[180px] flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Interview Type</label>
        <CustomDropdown<InterviewType>
          options={interviewTypes as InterviewType[]}
          value={type}
          onChange={setType}
        />
      </div>
      <div className="flex min-w-[180px] flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Scores</label>
        <CustomDropdown<ScoreOrder>
          options={scores as ScoreOrder[]}
          value={score}
          onChange={setScore}
        />
      </div>
      <div className="flex w-40 flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Date From</label>
        <input
          type="date"
          className="h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-gray-700 transition-colors focus:border-green-300 focus:outline-none"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>
      <div className="flex w-40 flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Date To</label>
        <input
          type="date"
          className="h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-gray-700 transition-colors focus:border-green-300 focus:outline-none"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
      <div className="flex h-full flex-col justify-end">
        <button className="h-10 rounded-lg bg-gray-900 px-5 py-2 font-medium text-white transition-colors hover:bg-gray-800">
          Filter
        </button>
      </div>
    </div>
  );
}
