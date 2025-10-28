import Pending from './Pending';
import TableController from './TableController';
export default function Table() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-4 rounded-sm bg-white p-4">
      <TableController />
      <Pending />
    </div>
  );
}
