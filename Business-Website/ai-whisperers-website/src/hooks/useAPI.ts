import { useState, useCallback } from 'react';
import type { APIResponse } from '@/types';

export interface UseAPIOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
}

export interface UseAPIReturn<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (apiCall: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

export function useAPI<T = any>(options: UseAPIOptions = {}): UseAPIReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      
      if (options.onError) {
        options.onError(errorMessage);
      }
      
      console.error('API call failed:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

// Specialized hooks for common API patterns
export function useEnrollment() {
  return useAPI<APIResponse<any>>({
    onSuccess: (data) => {
      console.log('Enrollment successful:', data);
    },
    onError: (error) => {
      console.error('Enrollment failed:', error);
    }
  });
}

export function useProgress(courseId: string) {
  const { execute, ...rest } = useAPI();

  const getProgress = useCallback(async () => {
    return execute(() => 
      fetch(`/api/courses/${courseId}/progress`).then(res => res.json())
    );
  }, [courseId, execute]);

  const updateProgress = useCallback(async (lessonId: string, progressData: any) => {
    return execute(() => 
      fetch(`/api/courses/${courseId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, ...progressData })
      }).then(res => res.json())
    );
  }, [courseId, execute]);

  return {
    ...rest,
    getProgress,
    updateProgress,
  };
}