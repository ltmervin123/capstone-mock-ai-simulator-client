import { useState, useEffect, useRef } from 'react';

type ProgramDropdownProps = {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  options: string[];
  error?: string;
  disabled?: boolean;
};

export default function ProgramDropDown({
  selectedOption,
  setSelectedOption,
  options,
  error,
  disabled,
}: ProgramDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex w-full items-center justify-between rounded-md border border-green-700 px-4 py-2 pr-10 font-inter transition-all duration-300 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 ${error ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
        disabled={disabled}
      >
        <span className={`truncate ${selectedOption ? '' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption : 'Select your enrolled program'}
        </span>
        <svg
          className={`absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-56 w-full min-w-0 overflow-y-auto rounded border border-gray-200 bg-white shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer whitespace-normal break-words px-4 py-2 ${
                selectedOption === option ? 'bg-gray-100 font-medium' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
