export type Student = {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  program: string;
  studentId: string;
  nameExtension?: string;
};

export type AcceptedStudent = Student & {
  acceptedAt: Date;
  isAuthenticated: boolean;
};

export type PendingStudent = Student & {
  updatedAt: Date;
};
