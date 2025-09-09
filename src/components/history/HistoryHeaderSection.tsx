import { useState } from 'react';
import FilterDropdown from '../ui/drop-down';
const OPTIONS = ['All', 'Basic', 'Behavioral', 'Expert', 'Highest', 'Lowest'];

function HistoryHeaderSection() {
  const [selectedOption, setSelectedOption] = useState('All');
  return (
    <div className="rounded-md border-gray-200 bg-white p-4">
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-3xl font-bold">Interview History</h1>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-2 sm:space-y-0">
          <p className="text-sm font-medium text-gray-700 sm:text-base sm:font-normal">
            Filter By:
          </p>
          <div className="w-24 sm:w-auto">
            <FilterDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryHeaderSection;
