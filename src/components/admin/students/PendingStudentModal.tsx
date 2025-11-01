import Modal from '@/layouts/Modal';
import { PendingStudent } from '@/types/admin/student-type';
import { handleDateFormat } from '@/utils/handleDates';
import { X, Check, XCircle, Mail, User, Hash, GraduationCap, Calendar } from 'lucide-react';

type InfoFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};
const InfoField = ({ icon, label, value }: InfoFieldProps) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all md:p-2`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-gray-600">{icon}</span>
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      </div>
      <div className={`font-medium text-gray-900`}>{value}</div>
    </div>
  );
};

type PendingStudentProps = {
  setIsOpen: (isOpen: boolean) => void;
  student: PendingStudent;
};

export default function PendingStudentModal({ setIsOpen, student }: PendingStudentProps) {
  return (
    <Modal>
      <div className="relative h-auto w-[90vw] max-w-2xl rounded-lg bg-white">
        {/* Header with gradient */}
        <div className="relative rounded-t-lg bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 md:px-8 md:py-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-white transition-colors hover:bg-white hover:bg-opacity-20 md:right-6 md:top-6"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold text-white md:text-2xl">Pending Request Details</h2>
        </div>

        {/* Content */}
        <div className="h-[60vh] space-y-4 overflow-y-auto px-4 py-4 md:max-h-[75vh] md:px-8 md:py-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoField icon={<User size={18} />} label="First Name" value={student.firstName} />
            <InfoField icon={<User size={18} />} label="Middle Name" value={student.middleName} />
            <InfoField icon={<User size={18} />} label="Last Name" value={student.lastName} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoField icon={<Hash size={18} />} label="Student ID" value={student.studentId} />

            <InfoField
              icon={<Calendar size={18} />}
              label="Request Date"
              value={handleDateFormat(student.updatedAt)}
            />
          </div>

          <InfoField icon={<Mail size={18} />} label="Email" value={student.email} />

          <InfoField icon={<GraduationCap size={18} />} label="Program" value={student.program} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-4 py-4 md:flex-row md:justify-end md:gap-4 md:px-6 md:py-4">
          <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-red-500 bg-white px-4 py-2 font-semibold text-red-600 shadow-sm transition-all hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto">
            <XCircle size={20} />
            Reject
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto">
            <Check size={20} />
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
}
