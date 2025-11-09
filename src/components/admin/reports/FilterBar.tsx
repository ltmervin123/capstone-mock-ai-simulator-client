import { useState } from 'react';
import CustomDropdown from './FilterDropdown';
import { PROGRAM_ACRONYMS } from '@/constants/program-option';
import filterOptionStore from '@/stores/admin/report-filter-option-store';
import { getFullProgramName, getProgramAcronym } from '@/utils/handlePrograms';

const programs = ['All', ...Object.values(PROGRAM_ACRONYMS)];
const interviewTypes = ['All', 'Basic', 'Behavioral', 'Expert'];
const scores = ['All', 'Highest', 'Lowest'];

type Program = 'All' | 'BSIT' | 'BSBA' | 'BSED' | 'BEED';
type InterviewType = 'All' | 'Basic' | 'Behavioral' | 'Expert';
type ScoreOrder = 'All' | 'Highest' | 'Lowest';

export default function FilterBar() {
  const filterOptions = filterOptionStore((state) => state.filterOptions);
  const setFilterOption = filterOptionStore((state) => state.setFilterOptions);
  const [program, setProgram] = useState<Program>(
    (getProgramAcronym(filterOptions?.program!) as Program) || 'All'
  );
  const [interviewType, setInterviewType] = useState<InterviewType>(
    (filterOptions?.interviewType! as InterviewType) || 'All'
  );
  const [score, setScore] = useState<ScoreOrder>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const hasChanges = () => {
    return (
      program !== filterOptions.program ||
      interviewType !== filterOptions.interviewType ||
      score !== filterOptions.score ||
      dateFrom !== filterOptions.dateFrom ||
      dateTo !== filterOptions.dateTo
    );
  };

  const handleFilter = () => {
    const option: any = {};
    if (program !== 'All') {
      option.program = getFullProgramName(program);
    }
    if (interviewType !== 'All') {
      option.interviewType = interviewType;
    }
    if (score !== 'All') {
      option.score = score.toUpperCase();
    }
    if (dateFrom) {
      option.dateFrom = dateFrom;
    }
    if (dateTo) {
      option.dateTo = dateTo;
    }

    setFilterOption(option);
  };

  return (
    <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg">
      <div className="flex min-w-[180px] flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Course</label>
        <CustomDropdown<Program>
          options={programs as Program[]}
          value={program}
          onChange={setProgram}
        />
      </div>
      <div className="flex min-w-[180px] flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Interview Type</label>
        <CustomDropdown<InterviewType>
          options={interviewTypes as InterviewType[]}
          value={interviewType}
          onChange={setInterviewType}
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
          max={
            dateTo
              ? new Date(dateTo).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
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
          min={dateFrom ? new Date(dateFrom).toISOString().split('T')[0] : undefined}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
      <div className="flex h-full flex-col justify-end">
        <button
          className="h-10 rounded-lg bg-gray-900 px-5 py-2 font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
          onClick={handleFilter}
          disabled={!hasChanges()}
        >
          Filter
        </button>
      </div>
    </div>
  );
}
