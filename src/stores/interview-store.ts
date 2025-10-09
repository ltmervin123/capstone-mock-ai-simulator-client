import { InterviewOption, InterviewState } from '@/types/interview/interview-option-type';
import { create } from 'zustand';

const interviewStore = create<InterviewState>((set) => ({
  interviewOption: null,
  setInterviewOption: (option: InterviewOption) => set({ interviewOption: option }),
  clearInterviewOption: () => set({ interviewOption: null }),
}));

export default interviewStore;
