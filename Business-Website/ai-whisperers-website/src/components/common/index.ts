// Centralized exports for common components
export { 
  ErrorBoundary, 
  CourseErrorBoundary, 
  PaymentErrorBoundary, 
  DashboardErrorBoundary,
  withErrorBoundary 
} from './ErrorBoundary';

export { 
  FormField, 
  SelectField, 
  TextAreaField, 
  CheckboxField,
  FormActions, 
  FormContainer, 
  FormSection 
} from './FormComponents';

// Re-export types for convenience
export type { ErrorBoundaryState } from '@/types';