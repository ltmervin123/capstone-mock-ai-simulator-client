import { AuthStore, User } from '@/types/auth/auth-type';
import { create } from 'zustand';

const authStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => {
    set({ user: null });
  },
}));

export default authStore;
