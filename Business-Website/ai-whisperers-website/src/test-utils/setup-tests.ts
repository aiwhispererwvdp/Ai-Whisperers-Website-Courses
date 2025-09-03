// Conditional imports based on test type
let testDb: any = null
let setupTestDatabase: any = null  
let cleanupTestDatabase: any = null

if (process.env.TEST_TYPE === 'integration') {
  const testDbModule = require('@/lib/test-db')
  testDb = testDbModule.testDb
  setupTestDatabase = testDbModule.setupTestDatabase
  cleanupTestDatabase = testDbModule.cleanupTestDatabase
}

// Global test setup - runs before all tests
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test'
  process.env.DATABASE_URL = 'file:./test.db'
  
  // Only setup database for integration tests
  if (process.env.TEST_TYPE === 'integration') {
    console.log('Setting up test database for integration tests...')
    await setupTestDatabase()
  }
}, 30000) // 30 second timeout for database setup

// Global test cleanup - runs after all tests
afterAll(async () => {
  // Only cleanup database for integration tests
  if (process.env.TEST_TYPE === 'integration') {
    console.log('Cleaning up test database...')
    await cleanupTestDatabase()
  }
}, 30000)

// Reset database between each integration test
beforeEach(async () => {
  if (process.env.TEST_TYPE === 'integration') {
    await testDb.reset()
  }
})

// Mock console methods to reduce noise during testing
const originalConsole = { ...console }

beforeEach(() => {
  // Only suppress console in unit tests, not integration tests
  if (process.env.TEST_TYPE !== 'integration' && !process.env.DEBUG_TESTS) {
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
  }
})

afterEach(() => {
  // Restore console
  if (process.env.TEST_TYPE !== 'integration' && !process.env.DEBUG_TESTS) {
    console.log = originalConsole.log
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  }
  
  // Clear all mocks
  jest.clearAllMocks()
})

// Custom test utilities
export const runIntegrationTest = (name: string, testFn: () => void | Promise<void>) => {
  if (process.env.TEST_TYPE === 'integration') {
    test(name, testFn)
  } else {
    test.skip(`${name} (integration test - skipped in unit test mode)`, testFn)
  }
}

export const runUnitTest = (name: string, testFn: () => void | Promise<void>) => {
  if (process.env.TEST_TYPE !== 'integration') {
    test(name, testFn)
  } else {
    test.skip(`${name} (unit test - skipped in integration test mode)`, testFn)
  }
}

// Test data generators
export const generateTestEmail = (prefix = 'test') => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  return `${prefix}-${timestamp}-${random}@example.com`
}

export const generateTestUser = (overrides = {}) => ({
  email: generateTestEmail(),
  firstName: 'Test',
  lastName: 'User',
  experience: 'complete-beginner',
  goals: 'Learn AI fundamentals',
  marketingConsent: false,
  ...overrides,
})

export const generateTestCourse = (overrides = {}) => ({
  title: 'Test AI Course',
  description: 'A comprehensive test course for AI learning',
  price: 299,
  level: 'Beginner',
  category: 'foundations',
  popular: false,
  rating: 4.5,
  students: 100,
  ...overrides,
})

export const generateTestEnrollment = (overrides = {}) => ({
  paymentType: 'individual',
  pricePaid: 299,
  paymentStatus: 'COMPLETED',
  isActive: true,
  progress: 0,
  timeSpent: 0,
  ...overrides,
})

// Mock data for testing
export const mockCourseData = {
  'ai-foundations': {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'Learn the fundamentals of AI',
    price: 299,
    level: 'Beginner',
    category: 'foundations',
  },
  'applied-ai': {
    id: 'applied-ai',
    title: 'Applied AI',
    description: 'Apply AI concepts in real projects',
    price: 399,
    level: 'Intermediate',
    category: 'development',
  },
  'web-development-ai': {
    id: 'web-development-ai',
    title: 'AI Web Development',
    description: 'Build AI-powered web applications',
    price: 499,
    level: 'Advanced',
    category: 'web-development',
  },
  'enterprise-ai': {
    id: 'enterprise-ai',
    title: 'Enterprise AI',
    description: 'AI for business leaders and executives',
    price: 799,
    level: 'Executive',
    category: 'business',
  },
}

export const mockBundleData = {
  'complete-journey': {
    id: 'complete-journey',
    title: 'Complete AI Learning Journey',
    description: 'All courses in one comprehensive package',
    originalPrice: 1896,
    bundlePrice: 999,
    savings: 897,
    courses: ['ai-foundations', 'applied-ai', 'web-development-ai', 'enterprise-ai'],
  },
}

// API response helpers
export const mockSuccessResponse = <T>(data: T) => ({
  ok: true,
  status: 200,
  json: jest.fn().mockResolvedValue(data),
  text: jest.fn().mockResolvedValue(JSON.stringify(data)),
})

export const mockErrorResponse = (status: number, message: string) => ({
  ok: false,
  status,
  json: jest.fn().mockResolvedValue({ error: message }),
  text: jest.fn().mockResolvedValue(JSON.stringify({ error: message })),
  statusText: message,
})

// PayPal mock responses
export const mockPayPalOrderResponse = (orderId = 'test-order-id') => ({
  id: orderId,
  status: 'CREATED',
  intent: 'CAPTURE',
  purchase_units: [{
    reference_id: `AI-WHISPERERS-${Date.now()}`,
    amount: {
      currency_code: 'USD',
      value: '299.00',
    },
  }],
  links: [
    {
      href: `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
      rel: 'self',
      method: 'GET',
    },
    {
      href: `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`,
      rel: 'approve', 
      method: 'GET',
    },
  ],
})

export const mockPayPalCaptureResponse = (orderId = 'test-order-id') => ({
  id: orderId,
  status: 'COMPLETED',
  payment_source: {
    paypal: {
      email_address: 'test@example.com',
      account_id: 'test-account-id',
      name: {
        given_name: 'Test',
        surname: 'User',
      },
    },
  },
  purchase_units: [{
    reference_id: `AI-WHISPERERS-${Date.now()}`,
    payments: {
      captures: [{
        id: 'test-capture-id',
        status: 'COMPLETED',
        amount: {
          currency_code: 'USD',
          value: '299.00',
        },
      }],
    },
  }],
})