export type BehavioralCategory = {
  _id: string;
  category: string;
  description: string;
  numberOfQuestionToGenerate: number;
  questionCount: number;
};

export type BehavioralQuestionData = {
  _id: string;
  category: string;
  description: string;
  questions: string[];
};
