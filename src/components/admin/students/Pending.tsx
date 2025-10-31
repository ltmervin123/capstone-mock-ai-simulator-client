import { useState } from 'react';
import PendingStudent from './PendingStudent';

const mockStudents = [
  { name: 'Alvincent R. Sangco', id: '202525789101', program: 'BSIT', status: 'Pending' },
  { name: 'Ariane F. Bantilan', id: '20212345678', program: 'BSIT', status: 'Pending' },
  { name: 'Belina W. Mongado', id: '20212345555', program: 'BSCRIM', status: 'Pending' },
  { name: 'Rubilyn T. Membrano', id: '20227884512', program: 'BSBA', status: 'Pending' },
  { name: 'Rubilyn I. Membrano', id: '20220001487', program: 'BSIT', status: 'Pending' },
  { name: 'Benjie D. Sangco', id: '202525789101', program: 'BSIT', status: 'Pending' },
  { name: 'Jonel Q. Wagas', id: '20222535841', program: 'BSIT', status: 'Pending' },
  { name: 'Vincent G. Pahayat', id: '20220000001', program: 'BSIT', status: 'Pending' },
  { name: 'Alvincent R. Sangco', id: '202525789101', program: 'BSIT', status: 'Pending' },
  { name: 'Barbie O. Sayson', id: '20225551110', program: 'BSCRIM', status: 'Pending' },
  { name: 'Jaymar A. Tuba', id: '202255584765', program: 'BSIT', status: 'Pending' },
  { name: 'Alvincent R. Sangco', id: '202525789101', program: 'BSIT', status: 'Pending' },
  { name: 'Ariane F. Bantilan', id: '20212345678', program: 'BSIT', status: 'Pending' },
  { name: 'Belina W. Mongado', id: '20212345555', program: 'BSCRIM', status: 'Pending' },
  { name: 'Rubilyn T. Membrano', id: '20227884512', program: 'BSBA', status: 'Pending' },
  { name: 'Rubilyn I. Membrano', id: '20220001487', program: 'BSIT', status: 'Pending' },
  { name: 'Benjie D. Sangco', id: '202525789101', program: 'BSIT', status: 'Pending' },
  { name: 'Jonel Q. Wagas', id: '20222535841', program: 'BSIT', status: 'Pending' },
  { name: 'Vincent G. Pahayat', id: '20220000001', program: 'BSIT', status: 'Pending' },
  { name: 'Alvincent R. Sangco', id: '202525789101', program: 'BSIT', status: 'Pending' },
  { name: 'Barbie O. Sayson', id: '20225551110', program: 'BSCRIM', status: 'Pending' },
  { name: 'Jaymar A. Tuba', id: '202255584765', program: 'BSIT', status: 'Pending' },
];

const TABLE_HEADINGS = ['Name', 'Student ID', 'Program', 'Status', 'Actions'];

type Student = {
  name: string;
  id: string;
  program: string;
  status: string;
};

export default function Pending() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewPendingStudentModalOpen, setIsViewPendingStudentModalOpen] = useState(false);

  const handleViewDetails = (student: Student) => {
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
          <div className="min-w-full overflow-y-auto bg-white" style={{ maxHeight: '400px' }}>
            {mockStudents.map((student, index) => (
              <div
                key={`${student.id}-${index}`}
                className={`grid grid-cols-6 gap-4 border-b border-gray-200 p-4 text-sm text-gray-700 transition-colors hover:bg-gray-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <span className="col-span-2 flex items-center font-medium">{student.name}</span>
                <span className="col-span-1 flex items-center">{student.id}</span>
                <span className="col-span-1 flex items-center">{student.program}</span>
                <span className="col-span-1 flex items-center">
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    {student.status}
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
        {mockStudents.map((student, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  {student.status}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Student ID:</strong> {student.id}
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

      {isViewPendingStudentModalOpen && (
        <PendingStudent setIsOpen={setIsViewPendingStudentModalOpen} />
      )}
    </>
  );
}
