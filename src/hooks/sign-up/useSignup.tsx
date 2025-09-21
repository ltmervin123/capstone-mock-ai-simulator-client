import { useState } from 'react';
import { validateSignUpData, ValidationErrors } from '../../utils/validators/sign-up';
import { SignupFormData } from '../../zod-schemas/sign-up';

export default function useSignup() {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUp = async (data: SignupFormData) => {
    setErrors({});

    const validationErrors = validateSignUpData(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { success: false };
    }
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return { success: true };
    } catch (error) {
      console.error('Error during sign-up:', (error as Error).message);
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { errors, isSubmitting, signUp, setErrors };
}
