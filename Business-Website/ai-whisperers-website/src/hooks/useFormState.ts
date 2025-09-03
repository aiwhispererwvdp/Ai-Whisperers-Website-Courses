import { useState, useCallback } from 'react';
import type { FormErrors, ValidationRule, FormValidationSchema } from '@/types';

export interface UseFormStateOptions<T> {
  initialState: T;
  validationSchema?: FormValidationSchema;
  onSubmit?: (data: T) => Promise<void> | void;
}

export interface UseFormStateReturn<T> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  updateField: (field: keyof T, value: T[keyof T]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: FormErrors;
  isValidating: boolean;
  isValid: boolean;
  validateField: (field: keyof T) => boolean;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => Promise<boolean>;
}

export function useFormState<T extends Record<string, any>>({
  initialState,
  validationSchema,
  onSubmit,
}: UseFormStateOptions<T>): UseFormStateReturn<T> {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback((field: keyof T): boolean => {
    if (!validationSchema?.[field as string]) return true;

    const rule = validationSchema[field as string];
    const value = formData[field];
    let error: string | null = null;

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      error = `${String(field)} is required`;
    }
    
    // Length validation
    else if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        error = `${String(field)} must be at least ${rule.minLength} characters`;
      } else if (rule.maxLength && value.length > rule.maxLength) {
        error = `${String(field)} must not exceed ${rule.maxLength} characters`;
      }
    }

    // Pattern validation
    if (!error && rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      error = `${String(field)} format is invalid`;
    }

    // Custom validation
    if (!error && rule.custom) {
      error = rule.custom(value);
    }

    setErrors(prev => ({
      ...prev,
      [field as string]: error || ''
    }));

    return !error;
  }, [formData, validationSchema]);

  const validateForm = useCallback((): boolean => {
    if (!validationSchema) return true;

    const fieldNames = Object.keys(validationSchema) as Array<keyof T>;
    const results = fieldNames.map(field => validateField(field));
    return results.every(Boolean);
  }, [validationSchema, validateField]);

  const updateField = useCallback((field: keyof T, value: T[keyof T]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: '' }));
    }
  }, [errors]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : value;

    updateField(name as keyof T, finalValue as T[keyof T]);
  }, [updateField]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setIsValidating(false);
  }, [initialState]);

  const submitForm = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);
    
    const isFormValid = validateForm();
    
    if (!isFormValid) {
      setIsValidating(false);
      return false;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [formData, validateForm, onSubmit]);

  const isValid = Object.values(errors).every(error => !error) && 
                  Object.keys(formData).length > 0;

  return {
    formData,
    setFormData,
    updateField,
    handleChange,
    errors,
    isValidating,
    isValid,
    validateField,
    validateForm,
    resetForm,
    submitForm,
  };
}

// Validation helpers
export const createValidationSchema = <T>(
  schema: Record<keyof T, ValidationRule>
): FormValidationSchema => schema as FormValidationSchema;

export const validators = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },
  
  required: (value: any) => {
    return value && String(value).trim() !== '' ? null : 'This field is required';
  },
  
  minLength: (min: number) => (value: string) => {
    return value.length >= min ? null : `Must be at least ${min} characters`;
  },
  
  maxLength: (max: number) => (value: string) => {
    return value.length <= max ? null : `Must not exceed ${max} characters`;
  },
};