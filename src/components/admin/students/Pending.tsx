import { useState } from 'react';
import PendingStudentModal from './PendingStudentModal';
import { getProgramAcronym } from '@/utils/handlePrograms';
import { handleNames } from '@/utils/handleNames';
import { useGetPendingStudents } from '@/queries/admin/useStudent';
import authStore from '@/stores/auth-store';
import { PendingStudent } from '@/types/admin/student-type';

const TABLE_HEADINGS = ['Name', 'Student ID', 'Program', 'Status', 'Actions'];

export default function Pending() {
  const user = authStore((state) => state.user);
  const { data: pendingStudents = [], isLoading } = useGetPendingStudents(user!);
  const [selectedStudent, setSelectedStudent] = useState<PendingStudent | null>(null);
  const [isViewPendingStudentModalOpen, setIsViewPendingStudentModalOpen] = useState(false);

  const handleViewDetails = (student: PendingStudent) => {
    setSelectedStudent(student);
    setIsViewPendingStudentModalOpen(true);
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          {/* Table Header */}
          <div className="grid min-w-full grid-cols-6 gap-4 rounded-t-lg bg-green-700 p-4 text-left text-sm font-semibold text-white">
            {TABLE_HEADINGS.map((heading, index) => (
              <span
                key={heading}
                className={`${index === 0 ? 'col-span-2' : 'col-span-1'} flex items-center`}
              >
                {heading}
              </span>
            ))}
          </div>

          {/* Table Body */}
          <div className="min-h-[70vh] min-w-full overflow-y-auto bg-white">
            {isLoading && (
              <p className="p-4 text-center text-gray-500">Fetching pending students...</p>
            )}
            {!isLoading && pendingStudents.length === 0 && (
              <p className="p-4 text-center text-gray-500">No pending students found.</p>
            )}
            {pendingStudents.map((student, index) => (
              <div
                key={student._id}
                className={`grid grid-cols-6 gap-4 border-b border-gray-200 p-4 text-sm text-gray-700 transition-colors hover:bg-gray-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <span className="col-span-2 flex items-center font-medium">
                  {handleNames({
                    firstName: student.firstName,
                    middleName: student.middleName,
                    lastName: student.lastName,
                  })}
                </span>
                <span className="col-span-1 flex items-center">{student.studentId}</span>
                <span className="col-span-1 flex items-center">
                  {getProgramAcronym(student.program)}
                </span>
                <span className="col-span-1 flex items-center">
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Pending
                  </span>
                </span>
                <span className="col-span-1 flex items-center">
                  <button
                    className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={() => handleViewDetails(student)}
                  >
                    View Details
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="h-[400px] space-y-4 overflow-y-auto md:hidden">
        {isLoading && <p className="text-center text-gray-500">Fetching pending students...</p>}
        {!isLoading && pendingStudents.length === 0 && (
          <p className="text-center text-gray-500">No pending students found.</p>
        )}
        {pendingStudents.map((student) => (
          <div
            key={student._id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {handleNames({
                    firstName: student.firstName,
                    middleName: student.middleName,
                    lastName: student.lastName,
                  })}
                </h3>
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  Pending
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Student ID:</strong> {student.studentId}
                </p>
                <p>
                  <strong>Program:</strong> {getProgramAcronym(student.program)}
                </p>
              </div>
              <div className="mt-4">
                <button
                  className="w-full rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => handleViewDetails(student)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isViewPendingStudentModalOpen && selectedStudent && (
        <PendingStudentModal
          setIsOpen={setIsViewPendingStudentModalOpen}
          student={selectedStudent}
        />
      )}
    </>
  );
}
