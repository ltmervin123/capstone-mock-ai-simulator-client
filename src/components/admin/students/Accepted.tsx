import { useState } from 'react';
import AcceptedStudentModal from './AcceptedStudentModal';
import { getProgramAcronym } from '@/utils/handle-programs';
import { handleNames } from '@/utils/handle-names';
import { useGetAcceptedStudents } from '@/queries/admin/useStudent';
import authStore from '@/stores/public/auth-store';
import { AcceptedStudent } from '@/types/admin/student-type';

const TABLE_HEADINGS = ['Name', 'Student ID', 'Program', 'Status', 'Actions'];

const isOnlineStatus = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        Online
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
      Offline
    </span>
  );
};

type PendingProps = {
  filterOptions: Record<string, string | undefined>;
};

export default function Accepted({ filterOptions }: PendingProps) {
  const user = authStore((state) => state.user);
  const { data: acceptedStudents = [], isLoading } = useGetAcceptedStudents(user!, filterOptions);
  const [selectedStudent, setSelectedStudent] = useState<AcceptedStudent | null>(null);
  const [isViewPendingStudentModalOpen, setIsViewPendingStudentModalOpen] = useState(false);

  const handleViewDetails = (student: AcceptedStudent) => {
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
              <p className="p-4 text-center text-gray-500">Fetching accepted students...</p>
            )}
            {!isLoading && acceptedStudents.length === 0 && (
              <p className="p-4 text-center text-gray-500">No accepted students found.</p>
            )}
            {acceptedStudents.map((student, index) => (
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
                    nameExtension: student.nameExtension,
                  })}
                </span>
                <span className="col-span-1 flex items-center">{student.studentId}</span>
                <span className="col-span-1 flex items-center">
                  {getProgramAcronym(student.program)}
                </span>
                <span className="col-span-1 flex items-center">
                  {isOnlineStatus(student.isAuthenticated)}
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
        {isLoading && (
          <p className="p-4 text-center text-gray-500">Fetching accepted students...</p>
        )}
        {!isLoading && acceptedStudents.length === 0 && (
          <p className="p-4 text-center text-gray-500">No accepted students found.</p>
        )}
        {acceptedStudents.map((student) => (
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
                    nameExtension: student.nameExtension,
                  })}
                </h3>
                {isOnlineStatus(student.isAuthenticated)}
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Student ID:</strong> {student.studentId}
                </p>
                <p>
                  <strong>Program:</strong> {student.program}
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
        <AcceptedStudentModal
          setIsOpen={setIsViewPendingStudentModalOpen}
          student={selectedStudent}
        />
      )}
    </>
  );
}
