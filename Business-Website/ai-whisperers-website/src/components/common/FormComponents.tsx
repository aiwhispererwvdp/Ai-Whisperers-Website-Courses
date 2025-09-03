'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ExclamationCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { BaseComponentProps, SelectOption, FormFieldProps } from '@/types';

// ===== FORM FIELD COMPONENT =====

interface FormFieldComponentProps extends Omit<FormFieldProps, 'onChange'> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  success?: boolean;
  helpText?: string;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldComponentProps>(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onValueChange,
  error,
  success,
  required = false,
  placeholder,
  disabled = false,
  autoComplete,
  helpText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;

  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label 
          htmlFor={fieldId} 
          className={`block text-sm font-medium mb-2 ${
            required ? "after:content-['*'] after:ml-1 after:text-red-500" : ''
          } ${error ? 'text-red-700' : success ? 'text-green-700' : 'text-gray-700'}`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className={`h-5 w-5 ${
              error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-400'
            }`} />
          </div>
        )}
        
        <input
          ref={ref}
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim() || undefined}
          className={`
            block w-full rounded-lg border px-3 py-2 text-sm transition-colors
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon ? 'pr-10' : ''}
            ${error 
              ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500' 
              : success 
                ? 'border-green-300 bg-green-50 text-green-900 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:ring-2 focus:ring-offset-2
          `}
          {...props}
        />
        
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <RightIcon className={`h-5 w-5 ${
              error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-400'
            }`} />
          </div>
        )}

        {(error || success) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {error ? (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            ) : (
              <CheckIcon className="h-5 w-5 text-green-500" />
            )}
          </div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id={errorId}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </motion.p>
      )}

      {helpText && !error && (
        <p id={helpId} className="mt-2 text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

// ===== SELECT FIELD COMPONENT =====

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  onValueChange,
  options,
  error,
  required = false,
  placeholder,
  disabled = false,
  className = '',
}: SelectFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
    onValueChange?.(e.target.value);
  };

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div className={`form-field ${className}`}>
      <label 
        htmlFor={fieldId} 
        className={`block text-sm font-medium mb-2 ${
          required ? "after:content-['*'] after:ml-1 after:text-red-500" : ''
        } ${error ? 'text-red-700' : 'text-gray-700'}`}
      >
        {label}
      </label>
      
      <select
        id={fieldId}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm transition-colors
          ${error 
            ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:ring-2 focus:ring-offset-2
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id={errorId}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ===== TEXTAREA FIELD COMPONENT =====

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  onValueChange,
  error,
  required = false,
  placeholder,
  disabled = false,
  rows = 4,
  maxLength,
  className = '',
}: TextAreaFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    onValueChange?.(e.target.value);
  };

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div className={`form-field ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <label 
          htmlFor={fieldId} 
          className={`block text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-red-500" : ''
          } ${error ? 'text-red-700' : 'text-gray-700'}`}
        >
          {label}
        </label>
        {maxLength && (
          <span className="text-xs text-gray-500">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      
      <textarea
        id={fieldId}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm transition-colors resize-y
          ${error 
            ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          focus:ring-2 focus:ring-offset-2
        `}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id={errorId}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ===== FORM SECTION COMPONENT =====

interface FormSectionProps extends BaseComponentProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function FormSection({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  className = '' 
}: FormSectionProps) {
  return (
    <fieldset className={`form-section space-y-4 ${className}`}>
      {(title || description) && (
        <div className="border-b border-gray-200 pb-4">
          {title && (
            <legend className="flex items-center text-lg font-medium text-gray-900">
              {Icon && <Icon className="h-5 w-5 mr-2 text-gray-600" />}
              {title}
            </legend>
          )}
          {description && (
            <p className="mt-2 text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </fieldset>
  );
}

// ===== CHECKBOX COMPONENT =====

interface CheckboxFieldProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (checked: boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  className?: string;
}

export function CheckboxField({
  name,
  label,
  checked,
  onChange,
  onCheckedChange,
  error,
  required = false,
  disabled = false,
  helpText,
  className = '',
}: CheckboxFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    onCheckedChange?.(e.target.checked);
  };

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;

  return (
    <div className={`form-field ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={fieldId}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim() || undefined}
            className={`
              h-4 w-4 rounded border-gray-300 transition-colors
              ${error 
                ? 'border-red-300 text-red-600 focus:ring-red-500' 
                : 'text-blue-600 focus:ring-blue-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              focus:ring-2 focus:ring-offset-2
            `}
          />
        </div>
        <div className="ml-3">
          <label 
            htmlFor={fieldId}
            className={`text-sm font-medium cursor-pointer ${
              error ? 'text-red-700' : 'text-gray-700'
            } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {helpText && (
            <p id={helpId} className="mt-1 text-xs text-gray-500">
              {helpText}
            </p>
          )}
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id={errorId}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ===== FORM ACTIONS COMPONENT =====

interface FormActionsProps extends BaseComponentProps {
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  isValid?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  submitVariant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export function FormActions({
  submitText = 'Submit',
  cancelText = 'Cancel',
  isSubmitting = false,
  isValid = true,
  onSubmit,
  onCancel,
  showCancel = false,
  submitVariant = 'primary',
  className = '',
}: FormActionsProps) {
  const submitButtonClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
  };

  return (
    <div className={`flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 ${className}`}>
      {showCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {cancelText}
        </button>
      )}
      
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting || !isValid}
        className={`
          inline-flex items-center px-6 py-2 text-sm font-medium rounded-lg
          focus:ring-2 focus:ring-offset-2 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${submitButtonClasses[submitVariant]}
        `}
      >
        {isSubmitting && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-4 w-4 mr-2"
          >
            <div className="h-full w-full border-2 border-white border-t-transparent rounded-full" />
          </motion.div>
        )}
        {isSubmitting ? 'Processing...' : submitText}
      </button>
    </div>
  );
}

// ===== FORM CONTAINER =====

interface FormContainerProps extends BaseComponentProps {
  title?: string;
  description?: string;
  onSubmit?: (e: React.FormEvent) => void;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function FormContainer({
  title,
  description,
  onSubmit,
  children,
  maxWidth = 'lg',
  className = '',
}: FormContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${className}`}>
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      
      <form 
        onSubmit={onSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-6"
        noValidate
      >
        {children}
      </form>
    </div>
  );
}