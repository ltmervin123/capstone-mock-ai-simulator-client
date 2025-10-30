import { useState } from 'react';
import Pending from './Pending';
import TableController from './TableController';
import Accepted from './Accepted';

const TABLE_OPTIONS = ['Pending', 'Accepted'];
export default function Table() {
  const [tableOption, setTableOption] = useState(TABLE_OPTIONS[0]);
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-4 rounded-sm bg-white p-4">
      <TableController
        tableOption={tableOption}
        setTableOption={setTableOption}
        tableOptions={TABLE_OPTIONS}
      />
      {tableOption === 'Pending' ? <Pending /> : <Accepted />}
    </div>
  );
}
