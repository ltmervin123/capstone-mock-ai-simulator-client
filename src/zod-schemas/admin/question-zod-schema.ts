import z from 'zod';

export const behavioralQuestionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(5, { message: 'Description must be at least 5 characters long' })
    .max(500, { message: 'Description must be at most 500 characters long' }),
  category: z
    .string()
    .trim()
    .min(5, { message: 'Category must be at least 5 characters long' })
    .max(500, { message: 'Category must be at most 500 characters long' }),
  numberOfQuestionToGenerate: z
    .number()
    .min(5, { message: 'Number of question must be at least 5' })
    .optional(),
  questions: z
    .array(
      z
        .string()
        .trim()
        .min(5, { message: 'Question must be at least 5 characters long' })
        .max(500, { message: 'Question must be at most 500 characters long' })
    )
    .min(5, { message: 'At least five questions are required' }),
});

export type BehavioralQuestionFormData = z.infer<typeof behavioralQuestionSchema>;
