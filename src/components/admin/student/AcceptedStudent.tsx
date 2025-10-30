import Modal from '@/layouts/Modal';
import { X } from 'lucide-react';
import StudentDetail from './StudentDetail';

type AcceptedStudentProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function AcceptedStudent({ setIsOpen }: AcceptedStudentProps) {
  return (
    <Modal>
      <div className="relative h-auto w-[90vw] max-w-2xl rounded-lg bg-white">
        <div className="relative rounded-t-lg bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 md:px-8 md:py-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-white transition-colors hover:bg-white hover:bg-opacity-20 md:right-6 md:top-6"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold text-white md:text-2xl">Student Details</h2>
        </div>

        <div className="h-[60vh] space-y-4 overflow-y-auto px-4 py-4 md:max-h-[75vh] md:px-8 md:py-6">
          <StudentDetail />
        </div>
      </div>
    </Modal>
  );
}
