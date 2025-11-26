import { signupSchema, SignupFormData } from '../../zod-schemas/public/sign-up-zod-schema';

export type ValidationErrors = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  studentId?: string;
  program?: string;
  email?: string;
  password?: string;
  nameExtension?: string;
};

export function validateSignUpData(data: SignupFormData) {
  const errors: ValidationErrors = {};
  const result = signupSchema.safeParse(data);
  if (!result.success) {
    result.error.issues.forEach((err) => {
      const key = err.path[0] as keyof ValidationErrors;
      errors[key] = err.message;
    });
  }
  return errors;
}
