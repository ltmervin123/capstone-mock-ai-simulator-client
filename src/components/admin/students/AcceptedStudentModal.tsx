import Modal from '@/layouts/Modal';
import { Calendar, GraduationCap, Hash, Mail, User, X } from 'lucide-react';
import InfoField from './InfoField';
import { AcceptedStudent } from '@/types/admin/student-type';
import { handleDateFormat } from '@/utils/handle-dates';

type AcceptedStudentProps = {
  setIsOpen: (isOpen: boolean) => void;
  student: AcceptedStudent;
};

export default function AcceptedStudentModal({ setIsOpen, student }: AcceptedStudentProps) {
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoField icon={<User size={18} />} label="First Name" value={student.firstName} />
            <InfoField icon={<User size={18} />} label="Middle Name" value={student.middleName} />
            <InfoField icon={<User size={18} />} label="Last Name" value={student.lastName} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoField icon={<Hash size={18} />} label="Student ID" value={student.studentId} />

            <InfoField
              icon={<Calendar size={18} />}
              label="Accepted Date"
              value={handleDateFormat(student.acceptedAt)}
            />
          </div>

          <InfoField icon={<Mail size={18} />} label="Email" value={student.email} />

          <InfoField icon={<GraduationCap size={18} />} label="Program" value={student.program} />
        </div>
      </div>
    </Modal>
  );
}
