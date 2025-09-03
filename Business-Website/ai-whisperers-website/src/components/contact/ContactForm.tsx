'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperPlaneIcon, PersonIcon, EnvelopeClosedIcon, ChatBubbleIcon } from '@radix-ui/react-icons';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  experience: string;
  message: string;
  newsletter: boolean;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  role: '',
  interest: '',
  experience: '',
  message: '',
  newsletter: true,
};

const interestOptions = [
  { value: 'individual', label: 'Individual Course Enrollment' },
  { value: 'bundle', label: 'Course Bundle Information' },
  { value: 'corporate', label: 'Corporate Training Program' },
  { value: 'consultation', label: 'Free Learning Path Consultation' },
  { value: 'partnership', label: 'Partnership Opportunities' },
  { value: 'media', label: 'Media and Press Inquiries' },
  { value: 'other', label: 'Other Questions' },
];

const experienceOptions = [
  { value: 'complete-beginner', label: 'Complete Beginner (No AI Experience)' },
  { value: 'some-exposure', label: 'Some Exposure (Used AI tools casually)' },
  { value: 'basic-technical', label: 'Basic Technical (Some programming experience)' },
  { value: 'intermediate', label: 'Intermediate (Built some AI projects)' },
  { value: 'advanced', label: 'Advanced (Professional AI development)' },
  { value: 'business-leader', label: 'Business Leader (Strategic AI interest)' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    calendlyLink?: string;
    leadScore?: number;
    qualification?: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.interest) {
      newErrors.interest = 'Please select your area of interest';
    }

    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      errorElement?.focus();
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Contact submitted to HubSpot:', result);
      
      setSubmissionResult(result);
      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-success-50 border border-success-200 text-center"
      >
        <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChatBubbleIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-success-800 mb-4">
          Thank You for Your Message!
        </h3>
        <p className="text-success-700 mb-6">
          We've received your inquiry and will respond within 24 hours. 
          {submissionResult?.calendlyLink && (
            <>
              <br /><br />
              <strong>Ready for your consultation?</strong>
              <br />
              <a 
                href={submissionResult.calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline font-medium"
              >
                Schedule your free consultation now →
              </a>
            </>
          )}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-success-600 text-white font-semibold rounded-xl hover:bg-success-700 transition-all duration-300"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Get Personalized Guidance
        </h2>
        <p className="text-gray-600">
          Tell us about your AI learning goals and we'll provide personalized recommendations. 
          Free consultation available for all serious learners.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        aria-label="Contact form for AI learning guidance"
        noValidate
      >
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                  errors.name ? 'border-error-500' : 'border-gray-300'
                }`}
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </div>
            {errors.name && (
              <div id="name-error" className="mt-1 text-sm text-error-600" role="alert">
                {errors.name}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-error-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <div id="email-error" className="mt-1 text-sm text-error-600" role="alert">
                {errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Current Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              placeholder="Your job title or role"
            />
          </div>
        </div>

        {/* Interest and Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
              What are you interested in? *
            </label>
            <select
              id="interest"
              name="interest"
              required
              value={formData.interest}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select your interest</option>
              {interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
              Your AI Experience Level *
            </label>
            <select
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select your experience level</option>
              {experienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            How can we help you? *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Tell us about your AI learning goals, specific questions, or how we can help you succeed..."
          />
        </div>

        {/* Newsletter Signup */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-500 mt-0.5"
          />
          <label htmlFor="newsletter" className="text-sm text-gray-700">
            Yes, I'd like to receive AI learning tips, course updates, and industry insights. 
            (You can unsubscribe anytime)
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Sending Message...
              </>
            ) : (
              <>
                <PaperPlaneIcon className="mr-3 w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </div>

        {/* Response Time Note */}
        <div className="pt-4 text-center">
          <p className="text-sm text-gray-500">
            ⚡ We typically respond within 2-4 hours during business hours
            <br />
            🎯 Free consultations available for serious AI learners
          </p>
        </div>
      </form>
    </motion.div>
  );
}