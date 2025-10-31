import { Funnel, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type DropdownProps<T extends string> = {
  options: T[];
  value: T;
  onChange: (val: T) => void;
};

const CustomDropdown = <T extends string>({ options, value, onChange }: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-[180px]">
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:border-green-300"
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ minWidth: '180px' }}
      >
        <div className="flex items-center gap-2">
          <Funnel size={18} className="text-gray-500" />
          <span>{value}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt}
              className={`cursor-pointer px-4 py-2 hover:bg-green-50 ${
                value === opt ? 'bg-green-100 font-semibold text-green-700' : ''
              }`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              tabIndex={0}
              role="option"
              aria-selected={value === opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
