import { TabOption } from '.';
type TableControllerProps = {
  tableOption: TabOption;
  tableOptions: TabOption[];
  setTableOption: (option: TabOption) => void;
};
export default function Navigation({
  tableOption,
  tableOptions,
  setTableOption,
}: TableControllerProps) {
  return (
    <div className="bg-white p-3">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
