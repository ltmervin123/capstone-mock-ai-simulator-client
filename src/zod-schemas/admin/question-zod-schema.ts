import z from 'zod';

export const behavioralQuestionSchema = z.object({
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long' })
    .max(500, { message: 'Description must be at most 500 characters long' }),
  category: z
    .string()
    .min(5, { message: 'Category must be at least 5 characters long' })
    .max(500, { message: 'Category must be at most 500 characters long' }),
  questions: z
    .array(
      z
        .string()
        .min(5, { message: 'Question must be at least 5 characters long' })
        .max(500, { message: 'Question must be at most 500 characters long' })
    )
    .min(5, { message: 'At least five questions are required' }),
});

export type BehavioralQuestionFormData = z.infer<typeof behavioralQuestionSchema>;
