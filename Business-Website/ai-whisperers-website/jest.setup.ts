import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js dynamic imports
jest.mock('next/dynamic', () => (func: () => any) => func())

// Mock Framer Motion for tests (to avoid animation issues)
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    article: 'article',
    span: 'span',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    button: 'button',
    a: 'a',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    select: 'select',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
}))

// Mock PayPal SDK
jest.mock('@paypal/paypal-js', () => ({
  loadScript: jest.fn(() => Promise.resolve({})),
}))

jest.mock('@paypal/react-paypal-js', () => ({
  PayPalScriptProvider: ({ children }: { children: React.ReactNode }) => children,
  PayPalButtons: () => 'div',
  usePayPalScriptReducer: () => [{ isPending: false }, jest.fn()],
}))

// Mock Next-Auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock Prisma Client
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    course: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    enrollment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    payment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

// Mock Web Vitals
jest.mock('web-vitals', () => ({
  onCLS: jest.fn(),
  onFID: jest.fn(),
  onFCP: jest.fn(),
  onLCP: jest.fn(),
  onTTFB: jest.fn(),
}))

// Global test environment variables
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'
process.env.PAYPAL_CLIENT_ID = 'test_paypal_client_id'
process.env.PAYPAL_CLIENT_SECRET = 'test_paypal_client_secret'
process.env.PAYPAL_MODE = 'sandbox'
process.env.NEXTAUTH_SECRET = 'test_nextauth_secret'
process.env.NEXTAUTH_URL = 'http://localhost:3000'

// Increase test timeout for async operations
jest.setTimeout(30000)

// Mock fetch API for API route testing
global.fetch = jest.fn()

// Mock window.location if it doesn't exist or is not already mocked
if (typeof window !== 'undefined' && !window.location.assign.toString().includes('jest.fn')) {
  const mockLocation = {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
  }

  delete (window as any).location
  ;(window as any).location = mockLocation
}

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Conditionally import test setup utilities based on test type
if (process.env.TEST_TYPE === 'integration') {
  require('./src/test-utils/setup-tests')
}

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
  jest.resetAllMocks()
})