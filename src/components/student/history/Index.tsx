import { useState } from 'react';
import HistoryHeaderSection from './Header';
import HistoryTableSection from './HistoryTableSection';
import { InterviewHistoryFilterOption } from '@/types/student/interview-option-type';

const OPTIONS_KEY = {
  All: undefined,
  Basic: 'BASIC',
  Behavioral: 'BEHAVIORAL',
  Expert: 'EXPERT',
  Highest: 'HIGHEST',
  Lowest: 'LOWEST',
};

export default function Index() {
  const [filterBy, setFilterBY] = useState<string | undefined>(undefined);
  return (
    <div className="flex h-screen flex-col gap-4">
      <HistoryHeaderSection
        setFilterBY={(option) => setFilterBY(OPTIONS_KEY[option as keyof typeof OPTIONS_KEY])}
      />
      <HistoryTableSection filterBy={filterBy as InterviewHistoryFilterOption} />
    </div>
  );
}
