import {
  BehavioralQuestionFormData,
  behavioralQuestionSchema,
} from '@/zod-schemas/admin/question-zod-schema';

export type ValidationErrors = {
  description?: string;
  category?: string;
  questions?: Record<number, string>;
};

export function validateBehavioralQuestionData(data: BehavioralQuestionFormData) {
  const errors: ValidationErrors = {};
  const result = behavioralQuestionSchema.safeParse(data);

  if (!result.success) {
    result.error.issues.forEach((err) => {
      const key = err.path[0] as keyof ValidationErrors;

      if (key === 'questions') {
        const questionIndex = err.path[1] as number;

        if (!errors.questions) {
          errors.questions = {};
        }

        (errors.questions as Record<number, string>)[questionIndex] = err.message;
      } else {
        errors[key] = err.message;
      }
    });
  }

  return errors;
}
