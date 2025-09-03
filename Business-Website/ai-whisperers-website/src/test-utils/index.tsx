import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

// Mock session data for testing
export const mockSession = {
  user: {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg',
  },
  expires: '2024-12-31T23:59:59.999Z',
}

// PayPal script options for testing
const paypalOptions = {
  'client-id': 'test',
  currency: 'USD',
  intent: 'capture',
  components: 'buttons',
}

// Custom wrapper component for tests
interface AllTheProvidersProps {
  children: React.ReactNode
  session?: any
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  session = null 
}) => {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={paypalOptions}>
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  session?: any
}

const customRender = (
  ui: ReactElement,
  { session, ...renderOptions }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AllTheProviders session={session}>{children}</AllTheProviders>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything from testing library
export * from '@testing-library/react'
export * from '@testing-library/jest-dom'

// Override render method
export { customRender as render }

// Test data generators
export const createMockCourse = (overrides = {}) => ({
  id: 'test-course-id',
  title: 'Test AI Course',
  subtitle: 'Learn AI fundamentals',
  description: 'A comprehensive test course',
  level: 'Beginner' as const,
  difficulty: 1 as const,
  duration: '8 weeks',
  totalMinutes: 2400,
  lessons: 24,
  price: 299,
  originalPrice: null,
  category: 'foundations' as const,
  targetAudience: 'Beginners',
  prerequisites: 'None',
  learningOutcomes: ['Understand AI basics', 'Build first AI project'],
  keyHighlights: ['Hands-on projects', 'Expert instruction'],
  technologies: ['Python', 'TensorFlow'],
  color: 'blue-600',
  bgColor: 'blue-50',
  textColor: 'blue-900',
  borderColor: 'blue-200',
  popular: false,
  unique: false,
  premium: false,
  rating: 4.8,
  students: 1250,
  modules: [],
  curriculum: {
    overview: 'Test curriculum overview',
    totalDuration: 2400,
    moduleCount: 6,
    projectCount: 12,
    certificateOffered: true,
  },
  pricing: {
    individual: 299,
    team: 249,
    enterprise: 199,
    corporate: 149,
  },
  lastUpdated: '2024-01-01',
  ...overrides,
})

export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  image: 'https://example.com/avatar.jpg',
  role: 'student',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

export const createMockEnrollment = (overrides = {}) => ({
  id: 'test-enrollment-id',
  userId: 'test-user-id',
  courseId: 'test-course-id',
  enrollmentDate: '2024-01-01T00:00:00.000Z',
  progress: 0,
  paymentType: 'individual' as const,
  pricePaid: 299,
  paymentDate: '2024-01-01T00:00:00.000Z',
  paymentStatus: 'completed' as const,
  isActive: true,
  completedLessons: [],
  timeSpent: 0,
  lastAccessDate: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

// API response mocks
export const createMockAPIResponse = <T,>(data: T, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: jest.fn().mockResolvedValue(data),
  text: jest.fn().mockResolvedValue(JSON.stringify(data)),
})

// PayPal order mock
export const createMockPayPalOrder = (overrides = {}) => ({
  id: 'test-paypal-order-id',
  status: 'CREATED',
  intent: 'CAPTURE',
  purchase_units: [
    {
      reference_id: 'AI-WHISPERERS-123456789',
      amount: {
        currency_code: 'USD',
        value: '299.00',
      },
    },
  ],
  links: [
    {
      href: 'https://api.sandbox.paypal.com/v2/checkout/orders/test-order-id',
      rel: 'self',
      method: 'GET',
    },
    {
      href: 'https://www.sandbox.paypal.com/checkoutnow?token=test-order-id',
      rel: 'approve',
      method: 'GET',
    },
  ],
  ...overrides,
})

// Custom matchers for better test assertions
export const expectToBeVisible = (element: HTMLElement) => {
  expect(element).toBeInTheDocument()
  expect(element).toBeVisible()
}

export const expectToHaveValidPrice = (priceText: string, expectedPrice: number) => {
  const cleanPrice = priceText.replace(/[^0-9.]/g, '')
  expect(parseFloat(cleanPrice)).toBe(expectedPrice)
}

// Test ID generators for consistent test selectors
export const testIds = {
  course: {
    card: (courseId: string) => `course-card-${courseId}`,
    enrollButton: (courseId: string) => `enroll-button-${courseId}`,
    previewButton: (courseId: string) => `preview-button-${courseId}`,
    price: (courseId: string) => `course-price-${courseId}`,
  },
  enrollment: {
    form: 'enrollment-form',
    submitButton: 'enrollment-submit',
    paypalButton: 'paypal-button',
    successMessage: 'enrollment-success',
  },
  navigation: {
    homeLink: 'nav-home',
    coursesLink: 'nav-courses',
    aboutLink: 'nav-about',
    contactLink: 'nav-contact',
  },
  auth: {
    signInButton: 'sign-in-button',
    signOutButton: 'sign-out-button',
    userMenu: 'user-menu',
  },
}