import { Mail, User, Hash, GraduationCap, Calendar } from 'lucide-react';
import InfoField from './InfoField';

const studentData = {
  firstName: 'Alvincent',
  middleName: 'Fostanes',
  lastName: 'Sangco',
  studentId: '20221234565',
  program: 'Bachelor of Information Technology',
  email: 'alvincent.sangco@normi.edu.ph',
  joinedDate: 'January, 5 2025  9:00 AM',
  status: 'Pending',
};

export default function StudentDetail() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InfoField icon={<User size={18} />} label="First Name" value={studentData.firstName} />
        <InfoField icon={<User size={18} />} label="Middle Name" value={studentData.middleName} />
        <InfoField icon={<User size={18} />} label="Last Name" value={studentData.lastName} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoField icon={<Hash size={18} />} label="Student ID" value={studentData.studentId} />

        <InfoField
          icon={<Calendar size={18} />}
          label="Accepted Date"
          value={studentData.joinedDate}
        />
      </div>

      <InfoField icon={<Mail size={18} />} label="Email" value={studentData.email} />

      <InfoField icon={<GraduationCap size={18} />} label="Program" value={studentData.program} />
    </>
  );
}
