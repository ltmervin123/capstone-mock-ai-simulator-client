export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  program: string;
  role: string;
};

export type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
