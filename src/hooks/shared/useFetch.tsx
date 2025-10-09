import { AxiosError } from 'axios';
import { useState } from 'react';
import { ZodError } from 'zod';

/**
 * Type for possible errors that can occur during fetch operations
 */
type ErrorType = AxiosError | ZodError | Error | null;

/**
 * Generic fetch hook for handling API requests
 * @template TData The expected data type returned from the API
 * @template TParams Optional parameters type for the fetch function
 */
export default function useFetch<TData, TParams>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<ErrorType>(null);

  /**
   * Executes the provided fetch function with optional parameters
   * @param fetchFunction - Function that returns a promise with the expected data
   * @param params - Optional parameters to pass to the fetch function
   * @returns A promise that resolves to the fetched data
   */
  const handleFetch = async (
    fetchFunction: (params?: TParams) => Promise<TData>,
    params?: TParams
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFunction(params);
      setData(result);
    } catch (err) {
      if (err instanceof AxiosError || err instanceof ZodError || err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unexpected error occurred'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets the hook state
   */
  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    isLoading,
    data,
    error,
    handleFetch,
    reset,
  };
}
