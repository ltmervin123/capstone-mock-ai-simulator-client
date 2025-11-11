import { useState } from 'react';
import Pending from './Pending';
import Navigation from './Navigation';
import Accepted from './Accepted';

const TABLE_OPTIONS = ['Pending', 'Accepted'];
const FILTER_OPTIONS = ['Name', 'Student ID'];

export default function Table() {
  const [tableOption, setTableOption] = useState(TABLE_OPTIONS[0]);
  const [filterOption, setFilterOption] = useState(FILTER_OPTIONS[0]);
  const [query, setQuery] = useState('');

  const handleFilterOption = () => {
    const optionKey: Record<string, string> = {
      Name: 'name',
      'Student ID': 'studentId',
    };
    return optionKey[filterOption] || 'name';
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-4 rounded-sm bg-white p-4">
      <Navigation
        tableOption={tableOption}
        setTableOption={setTableOption}
        tableOptions={TABLE_OPTIONS}
        query={query}
        FILTER_OPTIONS={FILTER_OPTIONS}
        setQuery={setQuery}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      {tableOption === 'Pending' ? (
        <Pending filterOptions={{ [handleFilterOption()]: query }} />
      ) : (
        <Accepted filterOptions={{ [handleFilterOption()]: query }} />
      )}
    </div>
  );
}
