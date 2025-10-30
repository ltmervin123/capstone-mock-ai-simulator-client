import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const OPTIONS = ['Name', 'Student ID', 'Program'];

type DropDownProps = {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  options: string[];
};

const FilterDropdown = ({ options, selectedOption, setSelectedOption }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 font-medium text-gray-700 transition-colors hover:border-green-300"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <span>{selectedOption}</span>
        </div>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left transition-colors hover:bg-green-50 ${
                  selectedOption === option
                    ? 'bg-green-50 font-semibold text-green-700'
                    : 'text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

type TableControllerProps = {
  tableOption: string;
  tableOptions: string[];
  setTableOption: (option: string) => void;
};
export default function TableController({
  tableOption,
  tableOptions,
  setTableOption,
}: TableControllerProps) {
  const [filterOption, setFilterOption] = useState(OPTIONS[0]);

  const [query, setQuery] = useState('');

  return (
    <div className="bg-white p-3">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Search Input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 py-2.5 pl-12 pr-4 text-gray-700 transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Search students..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <FilterDropdown
          options={OPTIONS}
          selectedOption={filterOption}
          setSelectedOption={setFilterOption}
        />

        {/* Tab Buttons */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {tableOptions.map((option) => {
            const active = tableOption === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setTableOption(option)}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
