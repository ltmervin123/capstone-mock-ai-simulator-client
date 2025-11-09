import { FilterOptionState } from '@/types/admin/report-type';
import { create } from 'zustand';

const filterOptionStore = create<FilterOptionState>((set) => ({
  filterOptions: {},
  setFilterOptions: (option) =>
    set(() => ({
      filterOptions: option,
    })),
}));

export default filterOptionStore;
