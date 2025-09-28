import {
  type SigninPayload as SigninPayloadType,
  signinSchema,
} from '@/zod-schemas/sign-in-zod-schema';

export type ValidationErrors = {
  email?: string;
  password?: string;
};

export function validateSignInData(data: SigninPayloadType) {
  const errors: ValidationErrors = {};
  const result = signinSchema.safeParse(data);
  if (!result.success) {
    result.error.issues.forEach((err) => {
      const key = err.path[0] as keyof ValidationErrors;
      errors[key] = err.message;
    });
  }
  return errors;
}
