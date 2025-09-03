/**
 * Unit tests for EnrollmentForm component
 * Tests form functionality, validation, and user interactions
 */

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, createMockAPIResponse, runUnitTest } from '@/test-utils'
import EnrollmentForm from './EnrollmentForm'

// Mock the PayPal button component
jest.mock('@/components/payment/PayPalButton', () => {
  return function MockPayPalButton({ courseId, title, price, studentInfo, onSuccess, onError }: any) {
    return (
      <div data-testid="mock-paypal-button">
        <div>Course: {courseId}</div>
        <div>Title: {title}</div>
        <div>Price: ${price}</div>
        <button 
          onClick={() => onSuccess && onSuccess('test-payment-id')}
          data-testid="mock-paypal-pay"
        >
          Mock PayPal Pay
        </button>
        <button 
          onClick={() => onError && onError('test-error')}
          data-testid="mock-paypal-error"
        >
          Mock PayPal Error
        </button>
      </div>
    )
  }
})

// Mock fetch for API calls
global.fetch = jest.fn()

describe('EnrollmentForm Component - Unit Tests', () => {
  const defaultProps = {
    courseId: 'ai-foundations',
    title: 'AI Foundations Course',
    price: 299,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue(
      createMockAPIResponse({
        success: true,
        sessionId: 'test-session-123',
        message: 'Enrollment preparation successful',
        nextStep: 'payment',
      })
    )
  })

  runUnitTest('renders enrollment form with all required fields', () => {
    render(<EnrollmentForm {...defaultProps} />)

    // Check for form fields
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/experience/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/goals/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/marketing consent/i)).toBeInTheDocument()

    // Check for submit button
    expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument()
  })

  runUnitTest('shows validation errors for required fields', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    // Try to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /enroll now/i })
    await user.click(submitButton)

    // Check for validation errors (assuming basic HTML5 validation)
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)

    expect(firstNameInput).toBeInvalid()
    expect(lastNameInput).toBeInvalid()
    expect(emailInput).toBeInvalid()
  })

  runUnitTest('accepts valid form input', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    // Fill out the form
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com')
    await user.selectOptions(screen.getByLabelText(/experience/i), 'some-exposure')
    await user.type(screen.getByLabelText(/goals/i), 'Learn AI for career advancement')

    // Check that inputs have the correct values
    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Learn AI for career advancement')).toBeInTheDocument()
  })

  runUnitTest('validates email format', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    const emailInput = screen.getByLabelText(/email/i)
    
    // Test invalid email format
    await user.type(emailInput, 'invalid-email')
    await user.tab()

    expect(emailInput).toBeInvalid()
  })

  runUnitTest('shows PayPal button after successful form submission', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    // Fill out the required form fields
    await user.type(screen.getByLabelText(/first name/i), 'Jane')
    await user.type(screen.getByLabelText(/last name/i), 'Smith')
    await user.type(screen.getByLabelText(/email/i), 'jane.smith@example.com')
    await user.selectOptions(screen.getByLabelText(/experience/i), 'complete-beginner')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /enroll now/i }))

    // Wait for API call and PayPal button to appear
    await waitFor(() => {
      expect(screen.getByTestId('mock-paypal-button')).toBeInTheDocument()
    })

    // Verify PayPal button has correct props
    expect(screen.getByText('Course: ai-foundations')).toBeInTheDocument()
    expect(screen.getByText('Title: AI Foundations Course')).toBeInTheDocument()
    expect(screen.getByText('Price: $299')).toBeInTheDocument()
  })

  runUnitTest('calls enrollment preparation API with correct data', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    // Fill out the form
    await user.type(screen.getByLabelText(/first name/i), 'Test')
    await user.type(screen.getByLabelText(/last name/i), 'User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/company/i), 'Test Company')
    await user.selectOptions(screen.getByLabelText(/experience/i), 'intermediate')
    await user.type(screen.getByLabelText(/goals/i), 'Learn for testing')
    await user.click(screen.getByLabelText(/marketing consent/i))

    // Submit the form
    await user.click(screen.getByRole('button', { name: /enroll now/i }))

    // Verify API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/enrollment/prepare',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentInfo: {
              firstName: 'Test',
              lastName: 'User',
              email: 'test@example.com',
              company: 'Test Company',
              experience: 'intermediate',
              goals: 'Learn for testing',
              marketingConsent: true,
            },
            courseId: 'ai-foundations',
          }),
        })
      )
    })
  })

  runUnitTest('handles API errors gracefully', async () => {
    const user = userEvent.setup()
    
    // Mock API error
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ error: 'Invalid email format' }),
    })

    render(<EnrollmentForm {...defaultProps} />)

    // Fill and submit form
    await user.type(screen.getByLabelText(/first name/i), 'Test')
    await user.type(screen.getByLabelText(/last name/i), 'User')
    await user.type(screen.getByLabelText(/email/i), 'invalid-email')
    await user.selectOptions(screen.getByLabelText(/experience/i), 'complete-beginner')
    await user.click(screen.getByRole('button', { name: /enroll now/i }))

    // Should show error and not show PayPal button
    await waitFor(() => {
      expect(screen.queryByTestId('mock-paypal-button')).not.toBeInTheDocument()
    })
  })

  runUnitTest('shows loading state during form submission', async () => {
    const user = userEvent.setup()
    
    // Mock delayed API response
    ;(global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve(createMockAPIResponse({
        success: true,
        sessionId: 'test-session-123',
      })), 100))
    )

    render(<EnrollmentForm {...defaultProps} />)

    // Fill and submit form
    await user.type(screen.getByLabelText(/first name/i), 'Test')
    await user.type(screen.getByLabelText(/last name/i), 'User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.selectOptions(screen.getByLabelText(/experience/i), 'complete-beginner')
    
    const submitButton = screen.getByRole('button', { name: /enroll now/i })
    await user.click(submitButton)

    // Should show loading state
    expect(submitButton).toBeDisabled()
  })

  runUnitTest('pre-fills marketing consent checkbox', () => {
    render(<EnrollmentForm {...defaultProps} />)

    const consentCheckbox = screen.getByLabelText(/marketing consent/i)
    expect(consentCheckbox).toBeChecked()
  })

  runUnitTest('allows toggling marketing consent', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    const consentCheckbox = screen.getByLabelText(/marketing consent/i)
    
    // Should start checked
    expect(consentCheckbox).toBeChecked()

    // Click to uncheck
    await user.click(consentCheckbox)
    expect(consentCheckbox).not.toBeChecked()

    // Click to check again
    await user.click(consentCheckbox)
    expect(consentCheckbox).toBeChecked()
  })

  runUnitTest('includes all experience level options', () => {
    render(<EnrollmentForm {...defaultProps} />)

    const experienceSelect = screen.getByLabelText(/experience/i)
    
    // Check for all experience options
    expect(screen.getByRole('option', { name: /complete beginner/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /some exposure/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /basic technical/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /intermediate/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /advanced/i })).toBeInTheDocument()
  })

  runUnitTest('handles successful PayPal payment', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    // Fill and submit form to get to PayPal button
    await user.type(screen.getByLabelText(/first name/i), 'Success')
    await user.type(screen.getByLabelText(/last name/i), 'Test')
    await user.type(screen.getByLabelText(/email/i), 'success@example.com')
    await user.selectOptions(screen.getByLabelText(/experience/i), 'complete-beginner')
    await user.click(screen.getByRole('button', { name: /enroll now/i }))

    // Wait for PayPal button
    await waitFor(() => {
      expect(screen.getByTestId('mock-paypal-button')).toBeInTheDocument()
    })

    // Simulate successful payment
    await user.click(screen.getByTestId('mock-paypal-pay'))

    // Should show success state or redirect (depending on implementation)
    // This would depend on the actual implementation of the success handler
  })

  runUnitTest('handles PayPal payment errors', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    // Fill and submit form to get to PayPal button
    await user.type(screen.getByLabelText(/first name/i), 'Error')
    await user.type(screen.getByLabelText(/last name/i), 'Test')
    await user.type(screen.getByLabelText(/email/i), 'error@example.com')
    await user.selectOptions(screen.getByLabelText(/experience/i), 'complete-beginner')
    await user.click(screen.getByRole('button', { name: /enroll now/i }))

    // Wait for PayPal button
    await waitFor(() => {
      expect(screen.getByTestId('mock-paypal-button')).toBeInTheDocument()
    })

    // Simulate payment error
    await user.click(screen.getByTestId('mock-paypal-error'))

    // Should handle error gracefully (implementation-dependent)
  })

  runUnitTest('validates required fields before showing PayPal button', async () => {
    const user = userEvent.setup()
    render(<EnrollmentForm {...defaultProps} />)

    // Try to submit with only some fields filled
    await user.type(screen.getByLabelText(/first name/i), 'Partial')
    // Leave other required fields empty
    
    await user.click(screen.getByRole('button', { name: /enroll now/i }))

    // Should not make API call or show PayPal button
    expect(global.fetch).not.toHaveBeenCalled()
    expect(screen.queryByTestId('mock-paypal-button')).not.toBeInTheDocument()
  })
})