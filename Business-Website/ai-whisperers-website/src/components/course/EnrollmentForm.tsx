'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  EnvelopeIcon, 
  IdentificationIcon 
} from '@heroicons/react/24/outline';
import PayPalButton from '@/components/payment/PayPalButton';
import { 
  FormContainer, 
  FormSection, 
  FormField, 
  SelectField, 
  TextAreaField, 
  CheckboxField, 
  FormActions,
  PaymentErrorBoundary 
} from '@/components/common';
import { useFormState, useAPI, createValidationSchema, validators } from '@/hooks';
import { apiClient } from '@/lib/api';
import type { 
  EnrollmentFormProps, 
  StudentInfo, 
  EnrollmentRequest,
  ExperienceLevel 
} from '@/types';
import { EXPERIENCE_OPTIONS } from '@/types';

const enrollmentValidationSchema = createValidationSchema<StudentInfo>({
  firstName: { required: true, minLength: 2, maxLength: 50 },
  lastName: { required: true, minLength: 2, maxLength: 50 },
  email: { required: true, custom: validators.email },
  experience: { required: true },
  goals: { maxLength: 500 },
  company: { maxLength: 100 },
  marketingConsent: { required: false },
});

const initialStudentInfo: StudentInfo = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  experience: 'complete-beginner' as ExperienceLevel,
  goals: '',
  marketingConsent: true,
};

export default function EnrollmentForm({ courseId, title, price, onSuccess, onError }: EnrollmentFormProps) {
  const [showPayment, setShowPayment] = useState(false);
  
  const {
    formData: studentInfo,
    handleChange,
    updateField,
    errors,
    isValidating,
    isValid,
    validateForm,
    submitForm,
  } = useFormState({
    initialState: initialStudentInfo,
    validationSchema: enrollmentValidationSchema,
    onSubmit: handleFormSubmit,
  });

  const { execute: prepareEnrollment } = useAPI({
    onError: (error) => {
      console.error('Enrollment preparation failed:', error);
      onError?.(error);
    }
  });

  async function handleFormSubmit() {
    const isFormValid = validateForm();
    if (!isFormValid) return;

    const result = await prepareEnrollment(() =>
      apiClient.post('/enrollment/prepare', {
        studentInfo,
        courseId,
      })
    );

    if (result) {
      setShowPayment(true);
    }
  }

  const handlePaymentSuccess = (orderId: string, details: any) => {
    console.log('Payment successful:', { orderId, details, studentInfo });
    onSuccess?.({
      id: orderId,
      courseId,
      courseTitle: title,
      enrollmentDate: new Date(),
      access: {
        dashboardUrl: `/dashboard/courses/${courseId}`,
        startLessonUrl: `/dashboard/courses/${courseId}/lessons/1`,
      }
    });
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    setShowPayment(false);
    onError?.('Payment failed. Please try again or contact support.');
  };

  return (
    <FormContainer
      title="Student Information"
      description="Please provide your information to set up your course access and personalize your learning experience."
      onSubmit={submitForm}
      maxWidth="xl"
    >
      {!showPayment ? (
        <>
          <FormSection 
            title="Personal Information" 
            icon={UserIcon}
            description="Basic information for your student profile"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                name="firstName"
                value={studentInfo.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
                placeholder="Your first name"
                leftIcon={IdentificationIcon}
                autoComplete="given-name"
              />

              <FormField
                label="Last Name"
                name="lastName"
                value={studentInfo.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
                placeholder="Your last name"
                autoComplete="family-name"
              />
            </div>

            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={studentInfo.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="your.email@example.com"
              helpText="This email will be used for course access and certificates"
              leftIcon={EnvelopeIcon}
              autoComplete="email"
            />
          </FormSection>

          <FormSection 
            title="Professional Information"
            icon={BuildingOfficeIcon}
            description="Help us understand your background and goals"
          >
            <FormField
              label="Company/Organization"
              name="company"
              value={studentInfo.company || ''}
              onChange={handleChange}
              error={errors.company}
              placeholder="Your company or organization"
              autoComplete="organization"
            />

            <SelectField
              label="Your AI Experience Level"
              name="experience"
              value={studentInfo.experience}
              onChange={handleChange}
              onValueChange={(value) => updateField('experience', value as ExperienceLevel)}
              options={EXPERIENCE_OPTIONS}
              error={errors.experience}
              required
              placeholder="Select your experience level"
            />

            <TextAreaField
              label="What do you hope to achieve with this course?"
              name="goals"
              value={studentInfo.goals || ''}
              onChange={handleChange}
              error={errors.goals}
              placeholder="Tell us about your AI learning goals and how this course fits into your career plans..."
              rows={3}
              maxLength={500}
            />

            <CheckboxField
              name="marketingConsent"
              label="I'd like to receive course updates, AI learning tips, and industry insights. (You can unsubscribe anytime)"
              checked={studentInfo.marketingConsent}
              onChange={handleChange}
              onCheckedChange={(checked) => updateField('marketingConsent', checked)}
            />
          </FormSection>

          <FormActions
            submitText="Continue to Payment"
            isSubmitting={isValidating}
            isValid={isValid}
            onSubmit={(e) => {
              e?.preventDefault();
              submitForm();
            }}
          />
        </>
      ) : (
        <PaymentErrorBoundary>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Complete Your Enrollment
              </h2>
              <p className="text-gray-600">
                Welcome {studentInfo.firstName}! Complete your payment to get instant access to {title}.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Enrollment Summary:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Student:</span>
                  <span className="ml-2 font-medium">{studentInfo.firstName} {studentInfo.lastName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{studentInfo.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <span className="ml-2 font-medium">
                    {EXPERIENCE_OPTIONS.find(opt => opt.value === studentInfo.experience)?.label}
                  </span>
                </div>
                {studentInfo.company && (
                  <div>
                    <span className="text-gray-600">Company:</span>
                    <span className="ml-2 font-medium">{studentInfo.company}</span>
                  </div>
                )}
              </div>
            </div>

            <PayPalButton
              courseId={courseId}
              price={price}
              title={title}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />

            <div className="text-center">
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
              >
                ← Back to Student Information
              </button>
            </div>
          </motion.div>
        </PaymentErrorBoundary>
      )}
    </FormContainer>
  );
}