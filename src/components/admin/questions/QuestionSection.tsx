import { useState } from 'react';
import Navigation from './Navigation';
import Behavioral from './Behavioral';
import BasicAndExpert from './BasicAndExpert';

const TABLE_OPTIONS = ['Behavioral ', 'Basic and Expert'];

export default function QuestionSection() {
  const [tableOption, setTableOption] = useState<string>(TABLE_OPTIONS[0]);
  return (
    <>
      <Navigation
        tableOption={tableOption}
        setTableOption={setTableOption}
        tableOptions={TABLE_OPTIONS}
      />
      <div className="h-[65vh] w-[auto] bg-white p-4">
        {tableOption === TABLE_OPTIONS[0] && <Behavioral />}
        {tableOption === TABLE_OPTIONS[1] && <BasicAndExpert />}
      </div>
    </>
  );
}
