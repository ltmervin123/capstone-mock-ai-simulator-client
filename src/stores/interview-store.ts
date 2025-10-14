import {
  InterviewConversation,
  InterviewOption,
  InterviewState,
} from '@/types/interview/interview-option-type';
import { create } from 'zustand';

const interviewStore = create<InterviewState>((set) => ({
  interviewOption: null,
  interviewConversation: [],
  aiResponse: '',
  setAiResponse: (response: string) => set({ aiResponse: response }),
  setInterviewConversation: (conversation: InterviewConversation) =>
    set({ interviewConversation: conversation }),
  setInterviewOption: (option: InterviewOption) => set({ interviewOption: option }),
  clearInterviewConversation: () => set({ interviewConversation: [] }),
  clearInterviewOption: () => set({ interviewOption: null }),
  clearAiResponse: () => set({ aiResponse: '' }),
  clearInterviewStore: () =>
    set({
      interviewOption: null,
      interviewConversation: [],
      aiResponse: '',
    }),
}));

export default interviewStore;
