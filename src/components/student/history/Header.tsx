import { useState } from 'react';
import FilterDropdown from '../../ui/drop-down';
const OPTIONS = ['All', 'Basic', 'Behavioral', 'Expert', 'Highest', 'Lowest'];

type HistoryHeaderSectionProps = {
  setFilterBY: (option: string | undefined) => void;
};

function HistoryHeaderSection({ setFilterBY }: HistoryHeaderSectionProps) {
  const [selectedOption, setSelectedOption] = useState('All');

  const handleSetOption = (option: string) => {
    setSelectedOption(option);
    setFilterBY(option);
  };

  return (
    <div className="rounded-md border-gray-200 bg-white p-4">
      <div className="flex flex-col space-y-3 sm:justify-between sm:space-y-0 md:flex-row">
        <h1 className="text-center text-3xl font-bold md:text-left">Interview History</h1>
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium text-gray-700 sm:text-base sm:font-normal">
            Filter By:
          </p>
          <div className="w-24 sm:w-auto">
            <FilterDropdown
              selectedOption={selectedOption}
              setSelectedOption={(option) => handleSetOption(option)}
              options={OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryHeaderSection;
